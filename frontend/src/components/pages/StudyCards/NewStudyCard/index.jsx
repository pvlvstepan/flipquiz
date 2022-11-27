import { useCallback } from 'react';

import {
    Button,
    CircularProgress,
    Stack,
    Switch,
    Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Reorder } from 'framer-motion';
import { useSnackbar } from 'notistack';
import {
    Controller,
    FormProvider,
    useFieldArray,
    useForm,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { createNewStudyCardQuery } from 'queries/studyCards/createNewStudyCard';

import { NewStudyCardHeader } from './NewStudyCardHeader';
import { NewTermButton } from './NewTermButton';
import { StudyCardFormReorder } from './StudyCardForm';

export const NewStudyCardPage = () => {
    const formMethods = useForm({
        defaultValues: {
            terms: [...Array(5)].map(() => ({
                key: uuid(),
                term: '',
                definition: '',
            })),
            commentsEnabled: true,
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        watch,
    } = formMethods;

    const { fields, append, remove } = useFieldArray({
        name: 'terms',
        control,
    });

    const terms = watch('terms');

    const onReorder = useCallback(
        (newOrder) =>
            setValue(
                'terms',
                terms.sort((a, b) => {
                    return newOrder.indexOf(a.key) - newOrder.indexOf(b.key);
                })
            ),
        [terms, setValue]
    );

    const formHasErrors = !!Object.keys(errors).length;

    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    const { isLoading, mutate: create } = useMutation(
        (studyCardData) => createNewStudyCardQuery(studyCardData),
        {
            onSuccess: (res) => {
                enqueueSnackbar('Study Card successfully created!', {
                    variant: 'success',
                });
                navigate(`/${res.data._id}`);
            },
            onError: () => {
                enqueueSnackbar(
                    "Something went wrong... We couldn't save this Study Card",
                    {
                        variant: 'error',
                    }
                );
            },
        }
    );

    const onSubmit = handleSubmit((data) => create(data));

    return (
        <FormProvider {...formMethods}>
            <Stack
                spacing={5}
                component="form"
                noValidate
                onSubmit={onSubmit}
                sx={{
                    '.reorder-group': {
                        '& > div:not(:last-child)': {
                            marginBottom: '1.5rem',
                        },
                    },
                }}
            >
                <NewStudyCardHeader
                    submitDisabled={formHasErrors}
                    isLoading={isLoading}
                />
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Controller
                        control={control}
                        name="commentsEnabled"
                        render={({ field }) => (
                            <Switch
                                checked={field.value}
                                onChange={(e, c) => field.onChange(c)}
                            />
                        )}
                    />
                    <Typography>Enable comments</Typography>
                </Stack>
                <Reorder.Group
                    axis="y"
                    values={terms.map((el) => el.key)}
                    onReorder={onReorder}
                    as="div"
                    className="reorder-group"
                >
                    {fields.map((item, index) => (
                        <StudyCardFormReorder
                            key={item.key}
                            id={item.key}
                            order={index + 1}
                            deleteDisabled={fields.length < 3}
                            onDelete={() => remove(index)}
                            TermFieldProps={{
                                ...register(`terms.${index}.term`, {
                                    required: true,
                                }),
                                error:
                                    errors.terms && errors.terms[index]
                                        ? !!errors.terms[index].term
                                        : undefined,
                            }}
                            DefinitionFieldProps={{
                                ...register(`terms.${index}.definition`, {
                                    required: true,
                                }),
                                error:
                                    errors.terms && errors.terms[index]
                                        ? !!errors.terms[index].definition
                                        : undefined,
                            }}
                        />
                    ))}
                </Reorder.Group>
                <Stack spacing={5}>
                    <NewTermButton
                        onClick={() =>
                            append({
                                key: uuid(),
                                definition: '',
                                term: '',
                            })
                        }
                    />
                    <Stack direction="row">
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ ml: 'auto' }}
                            type="submit"
                            disabled={formHasErrors}
                        >
                            {isLoading ? (
                                <CircularProgress
                                    size={26.25}
                                    color="inherit"
                                    variant="indeterminate"
                                />
                            ) : (
                                'Create'
                            )}
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </FormProvider>
    );
};
