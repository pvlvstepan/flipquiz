// import { faker } from "@faker-js/faker";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

const areas = [
    { id: 1, name: "Science and Technology" },
    { id: 2, name: "Health and Medicine" },
    { id: 3, name: "Social Sciences" },
    { id: 4, name: "Arts and Humanities" },
    { id: 5, name: "Business and Economics" },
    { id: 6, name: "Education" },
    { id: 7, name: "Law and Justice" },
    { id: 8, name: "Communication and Media" },
    { id: 9, name: "Environmental Studies" },
    { id: 10, name: "Interdisciplinary Studies" },
];

const subjectsList = [
    { areaId: 1, name: "Physics" },
    { areaId: 1, name: "Chemistry" },
    { areaId: 1, name: "Biology" },
    { areaId: 1, name: "Astronomy" },
    { areaId: 1, name: "Computer Science" },
    { areaId: 1, name: "Information Technology" },
    { areaId: 1, name: "Mathematics" },
    { areaId: 1, name: "Environmental Science" },
    { areaId: 1, name: "Engineering" },
    { areaId: 1, name: "Robotics" },
    { areaId: 2, name: "Medicine" },
    { areaId: 2, name: "Nursing" },
    { areaId: 2, name: "Public Health" },
    { areaId: 2, name: "Pharmacology" },
    { areaId: 2, name: "Nutrition" },
    { areaId: 2, name: "Psychology" },
    { areaId: 2, name: "Psychiatry" },
    { areaId: 2, name: "Physical Therapy" },
    { areaId: 2, name: "Epidemiology" },
    { areaId: 2, name: "Medical Imaging" },
    { areaId: 3, name: "Sociology" },
    { areaId: 3, name: "Anthropology" },
    { areaId: 3, name: "Psychology" },
    { areaId: 3, name: "Economics" },
    { areaId: 3, name: "Political Science" },
    { areaId: 3, name: "Geography" },
    { areaId: 3, name: "History" },
    { areaId: 3, name: "Cultural Studies" },
    { areaId: 3, name: "Archaeology" },
    { areaId: 3, name: "Linguistics" },
    { areaId: 4, name: "Literature" },
    { areaId: 4, name: "Philosophy" },
    { areaId: 4, name: "Fine Arts" },
    { areaId: 4, name: "Theater" },
    { areaId: 4, name: "Dance" },
    { areaId: 4, name: "Music" },
    { areaId: 4, name: "History of Art" },
    { areaId: 4, name: "Linguistics" },
    { areaId: 4, name: "Religion Studies" },
    { areaId: 4, name: "Comparative Literature" },
    { areaId: 4, name: "Classics" },
    { areaId: 4, name: "Creative Writing" },
    { areaId: 5, name: "Business Administration" },
    { areaId: 5, name: "Marketing" },
    { areaId: 5, name: "Finance" },
    { areaId: 5, name: "Accounting" },
    { areaId: 5, name: "Entrepreneurship" },
    { areaId: 5, name: "International Business" },
    { areaId: 5, name: "Economics" },
    { areaId: 5, name: "Supply Chain Management" },
    { areaId: 5, name: "Human Resource Management" },
    { areaId: 5, name: "Business Ethics" },
    { areaId: 6, name: "Education Policy" },
    { areaId: 6, name: "Curriculum Development" },
    { areaId: 6, name: "Educational Technology" },
    { areaId: 6, name: "Special Education" },
    { areaId: 6, name: "Higher Education" },
    { areaId: 6, name: "Adult Education" },
    { areaId: 6, name: "Early Childhood Education" },
    { areaId: 6, name: "Educational Psychology" },
    { areaId: 6, name: "School Counseling" },
    { areaId: 6, name: "Online Learning" },
    { areaId: 7, name: "Criminal Law" },
    { areaId: 7, name: "Civil Law" },
    { areaId: 7, name: "International Law" },
    { areaId: 7, name: "Human Rights" },
    { areaId: 7, name: "Constitutional Law" },
    { areaId: 7, name: "Criminal Justice" },
    { areaId: 7, name: "Forensic Science" },
    { areaId: 7, name: "Legal Studies" },
    { areaId: 7, name: "Cyber Law" },
    { areaId: 7, name: "Environmental Law" },
    { areaId: 8, name: "Journalism" },
    { areaId: 8, name: "Mass Communication" },
    { areaId: 8, name: "Public Relations" },
    { areaId: 8, name: "Advertising" },
    { areaId: 8, name: "Film Studies" },
    { areaId: 8, name: "Digital Media" },
    { areaId: 8, name: "Communication Disorders" },
    { areaId: 8, name: "Media Psychology" },
    { areaId: 8, name: "Broadcast Journalism" },
    { areaId: 8, name: "Social Media Studies" },
    { areaId: 9, name: "Environmental Science" },
    { areaId: 9, name: "Conservation Biology" },
    { areaId: 9, name: "Environmental Policy" },
    { areaId: 9, name: "Sustainable Development" },
    { areaId: 9, name: "Ecology" },
    { areaId: 9, name: "Climate Science" },
    { areaId: 9, name: "Natural Resource Management" },
    { areaId: 9, name: "Environmental Ethics" },
    { areaId: 9, name: "Renewable Energy" },
    { areaId: 9, name: "Environmental Engineering" },
    { areaId: 10, name: "Gender Studies" },
    { areaId: 10, name: "African American Studies" },
    { areaId: 10, name: "Asian Studies" },
    { areaId: 10, name: "Latin American Studies" },
    { areaId: 10, name: "Middle Eastern Studies" },
    { areaId: 10, name: "Global Studies" },
    { areaId: 10, name: "Peace and Conflict Studies" },
    { areaId: 10, name: "Cultural Studies" },
    { areaId: 10, name: "Disability Studies" },
    { areaId: 10, name: "Interdisciplinary Humanities" },
];

async function main() {
    await prisma.studySet.deleteMany({}).then(() => {
        console.log("Study Sets deleted");
    });
    await prisma.area.deleteMany({}).then(() => {
        console.log("Areas deleted");
    });
    await prisma.user.deleteMany({}).then(() => {
        console.log("Users deleted");
    });

    await Promise.all(
        areas.map(async (area) => {
            return prisma.area.create({
                data: {
                    name: area.name,
                    subjects: {
                        createMany: {
                            data: subjectsList
                                .filter((subject) => subject.areaId === area.id)
                                .map((subject) => {
                                    return {
                                        name: subject.name,
                                    };
                                }),
                        },
                    },
                },
            });
        }),
    ).then(async () => {
        console.log("Areas created");

        const numberOfUsers = 20;

        await Promise.all(
            Array.from({ length: numberOfUsers }).map(async () =>
                prisma.user.create({
                    data: {
                        username: faker.internet.userName(),
                        email: faker.internet.email(),
                        image: faker.image.avatar(),
                        password: await hash(faker.internet.password()),
                    },
                }),
            ),
        ).then(async () => {
            await prisma.user
                .create({
                    data: {
                        username: "admin",
                        email: "admin@flipquiz.com",
                        password: await hash("testtest"),
                    },
                })
                .then(() => {
                    console.log("Admin created");
                });

            console.log("Users created");

            const numberOfStudySets = 100;

            const subjects = await prisma.subject.findMany({});
            const users = await prisma.user.findMany({});

            return Promise.all(
                Array.from({ length: numberOfStudySets }).map(async () => {
                    const uniqueUsers = faker.helpers.uniqueArray(
                        users,
                        faker.number.int({ min: 1, max: numberOfUsers }),
                    );

                    return prisma.studySet.create({
                        data: {
                            name: faker.word.words({
                                count: {
                                    max: 5,
                                    min: 2,
                                },
                            }),
                            description: faker.word.words({
                                count: {
                                    max: 20,
                                    min: 0,
                                },
                            }),
                            area: {
                                connect: {
                                    id: faker.helpers.arrayElement(subjects)
                                        .areaId,
                                },
                            },
                            subject: {
                                connect: {
                                    id: faker.helpers.arrayElement(subjects).id,
                                },
                            },
                            createdBy: {
                                connect: {
                                    id: faker.helpers.arrayElement(users).id,
                                },
                            },
                            comments: {
                                createMany: {
                                    data: Array.from({
                                        length: faker.number.int({
                                            min: 1,
                                            max: 5,
                                        }),
                                    }).map(() => ({
                                        content: faker.lorem.paragraph({
                                            max: 2,
                                            min: 1,
                                        }),
                                        userId: faker.helpers.arrayElement(
                                            users,
                                        ).id,
                                    })),
                                },
                            },
                            ratings: {
                                createMany: {
                                    data: uniqueUsers.map((u) => ({
                                        rating: faker.number.int({
                                            min: 1,
                                            max: 5,
                                        }),
                                        userId: u.id,
                                    })),
                                },
                            },
                            views: {
                                createMany: {
                                    data: uniqueUsers.map((u) => ({
                                        userId: u.id,
                                    })),
                                },
                            },
                            cards: {
                                createMany: {
                                    data: Array.from({ length: 10 }).map(() => {
                                        return {
                                            term: faker.word.words({
                                                count: {
                                                    max: 5,
                                                    min: 1,
                                                },
                                            }),
                                            definition: faker.word.words({
                                                count: {
                                                    max: 20,
                                                    min: 3,
                                                },
                                            }),
                                        };
                                    }),
                                },
                            },
                        },
                    });
                }),
            );
        });
    });
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
