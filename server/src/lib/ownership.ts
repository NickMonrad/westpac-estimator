import { prisma } from './prisma.js'

/**
 * Verify strict project ownership (for destructive/admin operations).
 * Returns the project if the user owns it, otherwise null.
 */
export async function ownedProject(projectId: string, userId: string) {
  return prisma.project.findFirst({ where: { id: projectId, ownerId: userId } })
}

/**
 * Verify epic ownership via its parent project.
 * Returns the epic if the user owns the parent project, otherwise null.
 */
export async function ownedEpic(epicId: string, userId: string) {
  return prisma.epic.findFirst({
    where: { id: epicId, project: { ownerId: userId } },
  })
}

/**
 * Verify feature ownership via its parent project.
 * Returns the feature if the user owns the parent project, otherwise null.
 */
export async function ownedFeature(featureId: string, userId: string) {
  return prisma.feature.findFirst({
    where: { id: featureId, epic: { project: { ownerId: userId } } },
  })
}

/**
 * Verify user story ownership via its parent project.
 * Returns the story with parent project data if the user owns it, otherwise null.
 */
export async function ownedStory(storyId: string, userId: string) {
  return prisma.userStory.findFirst({
    where: { id: storyId, feature: { epic: { project: { ownerId: userId } } } },
    include: { feature: { include: { epic: { include: { project: { select: { hoursPerDay: true } } } } } } },
  })
}
