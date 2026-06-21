/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldGroup, Field, FieldLabel } from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import React from 'react'
import { ProjectFormState, ProjectStatus } from "@/src/app/types/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';

type UpdateFieldFn = <key extends keyof ProjectFormState>( key: key, value :ProjectFormState[key] ) => void;

const GeneralInfoStep = ({formData, updateField} : {formData: ProjectFormState, updateField:UpdateFieldFn }) => {
    return (
        <div className="w-full shrink-0">
            <h2 >Step 1: General Info</h2>
            <FieldGroup className="space-y-4">
                <Field>
                    <FieldLabel htmlFor="project-title">Project Title</FieldLabel>
                    <Input 
                        id="project-title" 
                        type="text" 
                        value={formData.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        placeholder="e.g. My SaaS Platform" 
                        required 
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="project-slug">URL Slug</FieldLabel>
                    <Input 
                        id="project-slug" 
                        type="text" 
                        value={formData.slug}
                        onChange={(e) => updateField("slug", e.target.value.toLowerCase().replace(/ /g, "-"))}
                        placeholder="e.g. my-saas-platform" 
                        required 
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="project-desc">Description</FieldLabel>
                    <textarea 
                        id="project-desc"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => updateField("description", e.target.value)}
                        className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Describe your structural features..."
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="project-status">Project Status</FieldLabel>
                    <Select 
                        value={formData.status}
                        onValueChange= {(val:any) => updateField("status", val as ProjectStatus)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="tech" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="DRAFT">Draft</SelectItem>
                                <SelectItem value="PUBLISHED">Published</SelectItem>
                                <SelectItem value="ARCHIVED">Archived</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                {/* Structural Boolean Switches */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="checkbox" checked={formData.isSolo} onChange={(e) => updateField("isSolo", e.target.checked)} className="accent-primary h-4 w-4" />
                        Is Solo Project
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="checkbox" checked={formData.sideProject} onChange={(e) => updateField("sideProject", e.target.checked)} className="accent-primary h-4 w-4" />
                        Is Side Project
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer text-sm font-medium col-span-2">
                        <input type="checkbox" checked={formData.forCompany} onChange={(e) => updateField("forCompany", e.target.checked)} className="accent-primary h-4 w-4" />
                        Built For a Company
                    </label>
                </div>

                {/* Conditional Field: Only appears if forCompany is true */}
                {formData.forCompany && (
                    <Field className="animate-in fade-in slide-in-from-top-1 duration-200">
                        <FieldLabel htmlFor="company-name">Company Name</FieldLabel>
                        <Input 
                            id="company-name" 
                            type="text" 
                            value={formData.companyName}
                            onChange={(e) => updateField("companyName", e.target.value)}
                            placeholder="Enter contracting company name..." 
                            required={formData.forCompany}
                        />
                    </Field>
                )}
            </FieldGroup>
        </div>
    )
}

export default GeneralInfoStep