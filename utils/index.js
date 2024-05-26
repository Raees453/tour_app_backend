const { PrismaClient } = require('@prisma/client');

exports.disconnectFromPrismaOnShutdown = async function() {
  const prisma = new PrismaClient();

  try {

    if (process.env.NODE_ENV === 'development') {
      // await prisma.tourGuide.deleteMany();
      // await prisma.user.deleteMany();
    }
    
    await prisma.$disconnect();
    console.log('Disconnected from Prisma.');
  } catch (error) {
    console.error('Error disconnecting from Prisma:', error);
  }

  process.exit(0);
};
