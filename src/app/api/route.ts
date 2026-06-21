/* eslint-disable @typescript-eslint/no-explicit-any */
"use server" 

import { Project, ProjectFormState,ProjectStatus } from "../types/types";
import prisma from '@/src/lib/prisma';
import { NextResponse } from "next/server";
import * as z from "zod"

export async function addProject(formData: ProjectFormState) {
    //& Zod validation layer
    const projectSchema = z.object({
        slug: z.string().min(1, "Slug is required"),
        title: z.string().min(1, "Title is required"),
        description: z.string().nullable().optional(),
        status: z.enum(["DRAFT", "PUBLISHED" , "ARCHIVED"]),
        
        // Links
        liveLink: z.string().url().nullable().optional(),
        repoLink: z.string().url().nullable().optional(),
        
        // Media
        projectMedia: z.array(z.string()),
        videos: z.array(z.string()),
        thumbUrl: z.string().nullable().optional(),
        iconUrl: z.string().nullable().optional(),
        iconColor: z.string().nullable().optional(),
        
        // Facts
        isSolo: z.boolean().default(true),
        forCompany: z.boolean().default(false),
        sideProject: z.boolean().default(true),
        companyName: z.string().nullable().optional(),
        
        // Relations (Ids passed from UI to connect records)
        categoryId: z.number().int(),
        techStackIds: z.array(z.number().int()), // Array of existing TechStack primary IDs
        
        // Time Stamps
        startingDate: z.coerce.date().nullable().optional(),
        endDate: z.coerce.date().nullable().optional(),
        totalPeriod: z.string().nullable().optional(),
    });
    const validated = projectSchema.parse(formData)

    //& Push the data to the DB via prisma client
    try {
        const project = await prisma.project.create({
            data: {
                slug: validated.slug,
                title: validated.title,
                description: validated.description,
                status: validated.status,
                
                liveLink: validated.liveLink,
                repoLink: validated.repoLink,
                
                projectMedia: validated.projectMedia,
                videos: validated.videos,
                thumbUrl: validated.thumbUrl,
                iconUrl: validated.iconUrl,
                iconColor: validated.iconColor,
                
                isSolo: validated.isSolo,
                forCompany: validated.forCompany,
                sideProject: validated.sideProject,
                companyName: validated.companyName,
                
                startingDate: validated.startingDate,
                endDate: validated.endDate,
                totalPeriod: validated.totalPeriod,

                // TODO: ad extra validation lear 
                category: {
                    connect: { id: validated.categoryId }
                },

                // TODO: ad extra validation lear 
                techStack: {
                    connect: validated.techStackIds.map((id) => ({ id }))
                }
            },
            // Optionally include relations in the return value
            include: { //! Specifies which relations should be eagerly loaded on the returned object. 
                category: true,
                techStack: true
            }
        });
        return { success: true, data: project };

    } catch (error) {
        console.error("Prisma insertion error:", error);
        return { success: false, error: "Failed to write project record to database" };
    }
}

export async function selectionData() {
    try {
        const techStacks = await prisma.techStack.findMany()
        const categories = await prisma.category.findMany()
        return { success: true, data: {techStacks, categories} }

    } catch (error) {
        return { success: false, error: "Failed to return the selectionData from the database : " + error };
    }
} 

export async function frontProjects(limitNumber: number = 10) {
    try {
        const projects = await prisma.project.findMany({
            where: {isPinned:true, status:'PUBLISHED'},
            orderBy: {sortOrder: "asc"},
            take: limitNumber
        })
        return { success: true, data: projects }

    } catch (error) {
        return { success: false, error: "Failed to return the frontProjects from the database : " + error };
    }
}

export async function getProjects(categoryId: number | null = null) {
    try {
        const projects = await prisma.project.findMany({
        where: {
            status: 'PUBLISHED',
            ...(categoryId && { categoryId }), //! If categoryId is null, Prisma ignores it. If it has a value, it filters by it.
        },
        orderBy: {
            sortOrder: "asc",
        },
        });

        return { success: true, data: projects };
    } catch (error) {
        return { success: false, error: "Failed to fetch projects: " + error };
    }
}
export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {select: {projects: {where: { status: 'PUBLISHED' }}}}
            }
        });
        return { success: true, data: categories };
    } catch (error) {
        return { success: false, error: "Failed to fetch categories: " + error };
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, data } = body;

        if (type === "CATEGORY") {
        const newCategory = await prisma.category.create({
            data: {
            name: data.name,
            description: data.description || null,
            thumbUrl: data.thumbUrl || null,
            sortOrder: Number(data.sortOrder) || 0,
            },
        });
        return NextResponse.json({ success: true, data: newCategory });
        }

        if (type === "TECHSTACK") {
        const newTech = await prisma.techStack.create({
            data: {
            name: data.name,
            role: data.role || null,
            iconUrl: data.iconUrl || null,
            sortOrder: Number(data.sortOrder) || 0,
            },
        });
        return NextResponse.json({ success: true, data: newTech });
        }

        return NextResponse.json({ success: false, error: "Invalid entity type payload allocation." }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// 2. Local TypeScript Integration Handler functions mirroring your pre-written actions
export async function createCategory(data: { name: string; description?: string; thumbUrl?: string; sortOrder?: number }) {
  try {
    const res = await prisma.category.create({ data });
    return { success: true, data: res };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createTechStack(data: { name: string; role?: string; iconUrl?: string; sortOrder?: number }) {
  try {
    const res = await prisma.techStack.create({ data });
    return { success: true, data: res };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}


