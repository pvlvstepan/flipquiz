import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const count = 20;

    const createAreaWithSubject = async () =>
        prisma.area.create({
            data: {
                name: faker.lorem.words({ min: 1, max: 3 }),
                subjects: {
                    createMany: {
                        data: Array.from({ length: 5 }).map(() => ({
                            name: faker.lorem.words({ min: 1, max: 3 }),
                        })),
                    },
                },
            },
        });

    const createStudySets = async () =>
        prisma.studySet.create({
            data: {
                createdById: "65816cf63a3867ab02bb65d4",
                subjectId: faker.helpers.arrayElement(
                    await prisma.subject.findMany({}),
                ).id,
                description: faker.commerce.productDescription(),
                name: faker.lorem.words({ min: 1, max: 3 }),
                cards: {
                    createMany: {
                        data: Array.from({ length: 5 }).map(() => ({
                            term: faker.lorem.words({ min: 1, max: 3 }),
                            definition: faker.lorem.words({ min: 1, max: 3 }),
                        })),
                    },
                },
            },
        });

    await Promise.all(
        Array.from({ length: count }).map(() => createAreaWithSubject()),
    ).then(() =>
        Promise.all(Array.from({ length: count }).map(() => createStudySets())),
    );
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
