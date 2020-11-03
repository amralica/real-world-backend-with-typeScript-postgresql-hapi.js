import { PrismaClient } from '@prisma/client'
import { add, max } from 'date-fns'

const prisma = new PrismaClient({
  log: ['error', 'warn'],
})

// A `main` function so that we can use async/await
async function main() {
  // Seed the database with users and posts
  await prisma.courseEnrollment.deleteMany({})
  await prisma.testResult.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.test.deleteMany({})
  await prisma.course.deleteMany({})

  const weekFromNow = add(new Date(), { days: 7 })
  const twoWeekFromNow = add(new Date(), { days: 14 })
  const monthFromNow = add(new Date(), { days: 28 })

  const grace = await prisma.user.create({
    data: {
      email: 'grace@hey.com',
      firstName: 'Grace',
      lastName: 'Bell',
      social: {
        facebook: 'gracebell',
        twitter: 'therealgracebell',
      },
    },
  })
  console.log(grace)
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.disconnect()
  })
