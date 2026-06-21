/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { FieldGroup, Field, FieldLabel } from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Category, ProjectFormState, TechStack } from "@/src/app/types/types"
import { Calendar, Tag,Users,Pin} from 'lucide-react'
import { selectionData } from '@/src/app/api/route'
import toast from 'react-hot-toast'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { Checkbox } from '@/src/components/ui/checkbox'

interface SelectionData {
    techStacks: TechStack[];
    categories: Category[];
}

type UpdateFieldFn = <key extends keyof ProjectFormState>(
    key: key, 
    value: ProjectFormState[key]
) => void


const FinalStep = ({ formData, updateField }: { formData: ProjectFormState, updateField: UpdateFieldFn }) => {
    const [options, setOptions] = useState<SelectionData>({ techStacks: [], categories: [] });
    const [isLoading, setIsLoading] = useState(true);

    //& Fetching the selection options data logic
    useEffect(() => {
        const fetchSelectionData  = async () => {
            try {
                const query = await selectionData();
                if (query.success && query.data) {
                    setOptions(query.data);
                } else {
                    toast.error(query.error || 'Something went wrong loading options');
                }
            } catch (err) {
                toast.error('Failed to connect to the server' + err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSelectionData()
    }, [])
    
    return (
        <div className="w-full shrink-0 ">
        <h2>Step 3: Relations & Dates</h2>
        
        <FieldGroup className="space-y-4">
            {/* Category Selection */}
            <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select 
                    disabled= {isLoading}
                    value={formData.categoryId ? String(formData.categoryId) : ""}
                    onValueChange= {(val) => updateField("categoryId", parseInt(val))}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="tech" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {options.categories.length < 1 ? <p> there is not stacks untill now </p> : 
                                options.categories.map((cate) => (
                                <SelectItem key={cate.id} value={cate.id.toString()}>
                                    {cate.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>

            {/* Tech Stack Multi-Select */}
            <Field>
                <FieldLabel>Tech Stack (Select all that apply)</FieldLabel>
                
                {isLoading ? (
                <div className="text-sm text-muted-foreground p-2">Loading stacks...</div>
                ) : (
                <div className="grid grid-cols-2 gap-2 p-4 border rounded-md max-h-48 overflow-y-auto bg-background">
                    {options.techStacks.map((tech) => {
                    const techId = tech.id
                    const isChecked = formData.techStackIds?.includes(techId) || false;

                    return (
                        <label 
                        key={tech.id} 
                        className="flex items-center space-x-3 text-sm cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
                        >
                        <Checkbox
                            id={`tech-${tech.id}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                            const currentIds = formData.techStackIds || [];
                            let nextIds: number[];

                            if (checked === true) {
                                nextIds = [...currentIds, techId];
                            } else {
                                nextIds = currentIds.filter((id) => id !== techId);
                            }
                            
                            updateField("techStackIds", nextIds);
                            }}
                        />
                        <span className="select-none font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {tech.name}
                        </span>
                        </label>
                    );
                    })}
                </div>
                )}
            </Field>


            {/* Date Section */}
            <div className="space-y-3 pt-2 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Timeline
            </h3>

            <div className="grid grid-cols-2 gap-4">
                <Field>
                <FieldLabel htmlFor="start-date">Start Date</FieldLabel>
                <Input 
                    id="start-date"
                    type="date"
                    value={formData.startingDate?.split('T')[0] || ''}
                    onChange={(e) => updateField("startingDate", e.target.value ? new Date(e.target.value).toISOString() : '')}
                />
                </Field>

                <Field>
                <FieldLabel htmlFor="end-date">End Date</FieldLabel>
                <Input 
                    id="end-date"
                    type="date"
                    value={formData.endDate?.split('T')[0] || ''}
                    onChange={(e) => updateField("endDate", e.target.value ? new Date(e.target.value).toISOString() : '')}
                />
                </Field>
            </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-2 pt-2 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Additional Options
            </h3>

            <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                <input 
                    type="checkbox" 
                    checked={formData.isPinned || false} 
                    onChange={(e) => updateField("isPinned", e.target.checked)} 
                    className="accent-primary h-4 w-4" 
                />
                <div className="flex items-center gap-1">
                    <Pin className="h-3 w-3" />
                    Pin Project
                </div>
                </label>

                <Field>
                <FieldLabel htmlFor="sort-order">Sort Order</FieldLabel>
                <Input 
                    id="sort-order"
                    type="number"
                    min="0"
                    value={formData.sortOrder || 0}
                    onChange={(e) => updateField("sortOrder", parseInt(e.target.value) || 0)}
                    className="w-full"
                />
                </Field>
            </div>
            </div>

            {/* Status Info */}
            <div className="mt-4 p-3 bg-muted/30 rounded-md border border-border">
            <p className="text-sm text-muted-foreground">
                <span className="font-medium">Status:</span> {formData.status}
            </p>
            {formData.totalPeriod && (
                <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">Duration:</span> {formData.totalPeriod}
                </p>
            )}
            </div>
        </FieldGroup>
        </div>
    )
}

export default FinalStep