/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { addProject } from "@/src/app/api/route";
import { ProjectFormState } from "@/src/app/types/types";
import { useState } from "react";
import toast from 'react-hot-toast';
import GeneralInfoStep from "./GeneralInfoStep";
import FinalStep from "./FinalStep";
import MediaStep from "./MediaStep";
import { Button } from "@/src/components/ui/button"; 
import { ArrowLeft, ArrowRight, Paperclip } from "lucide-react";

const initialFormState: ProjectFormState = {
    title: "",
    slug: "",
    description: "",
    status: "DRAFT",
    liveLink: "",
    repoLink: "",
    thumbUrl: "",
    iconUrl: "",
    iconColor: "#ec5627",
    projectMedia: [],
    videos: [],
    isSolo: true,
    forCompany: false,
    sideProject: true,
    companyName: "",
    categoryId: 0,
    techStackIds: [],
    startingDate: null,
    endDate: null,
    totalPeriod: "",
    isPinned: false,
    sortOrder: 0
};

const stepOffsets: Record<number, string> = {
    1: "0%",
    2: "100%",
    3: "200%",
}

export default function Page() {
    const [step, setStep] = useState<number>(1)
    const [formData, setFormData] = useState<ProjectFormState>(initialFormState)

    //& step slider logic 
    const stepSlider = (dir:'forward'|'backward') => {
        switch (dir) {
            case 'forward':
                step < 3 ? setStep(step + 1) : setStep(3)
                break;
            case 'backward':
                step < 1 ? setStep(1) : setStep(step - 1)
                break;
        }
    }
    //& Form logic 
    const updateField = (key: keyof ProjectFormState, value: any) => {
        setFormData((prev) => ({...prev, [key]: value}) )
    }
    const isFormInsufficient = !formData.title.trim() || !formData.slug.trim() || formData.categoryId === 0;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const query = await addProject(formData)
        if(query.success) {
            toast.success('Your project had craeted AMR! ', {
            icon: '👏',
            iconTheme: {
                primary: '#000',
                secondary: '#fff',
            },
            })
        } else {
            toast.error('there is something wrong AMR! ' + query.error)
        }
    };

    return (
        <div >
            {/* horisontal scrolling steps */}
            <div className="overflow-hidden w-full">
                {/* Step Breadcrumbs Indicator */}
                <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border transition-colors ${
                                step === num ? "bg-brand-green text-white border-white" : "bg-card border-border text-muted-foreground"
                            }`}>
                                {num}
                            </div>
                            <span className={`text-sm font-medium ${step === num ? "text-foreground" : "text-muted-foreground"}`}>
                                {num === 1 ? "General Info" : num === 2 ? "Media & Links" : "Relations & Dates"}
                            </span>
                        </div>
                    ))}
                </div>
                {/* Form content */}
                <div className="overflow-x-hidden overflow-y-auto max-h-[70vh] w-full border border-border rounded-xl bg-card py-6 shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <div 
                            className="flex w-full transition-transform duration-300 ease-in-out" 
                            style={{ transform: `translateX(${stepOffsets[step]})` }}
                        >
                            <div className="w-full space-y-6 px-4 shrink-0">
                                <GeneralInfoStep formData={formData} updateField={updateField} />
                            </div>
                            <div className="w-full space-y-6 px-4 shrink-0">
                                <MediaStep formData={formData} updateField={updateField} />
                            </div>
                            <div className="w-full space-y-6 px-4 shrink-0">
                                <FinalStep formData={formData} updateField={updateField} />
                            </div>
                        </div>
                        {/* action btns */}
                            <div className="flex items-center gap-3 mt-8 pt-4">
                                
                                {/* Backward Circle Action Button */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className={`rounded-full shrink-0`}
                                    disabled={step === 1}
                                    onClick={() => stepSlider('backward')}
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </Button>

                                {/* Forward Circle Action Button */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className={` rounded-full shrink-0`}
                                    disabled={step === 3}
                                    onClick={() => stepSlider('forward')}
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>

                                {/* 3. Submit Button (Takes remaining width space) */}
                                <Button
                                    type="submit"
                                    variant="default"
                                    className={`flex-1 rounded-xl bg-brand-green hover:bg-(--green)/90 text-white`}
                                    disabled={isFormInsufficient}
                                >
                                    <span>Submit Project</span>
                                    <Paperclip className="ml-2 h-4 w-4" />
                                </Button>

                            </div>
                    </form>
                </div>
            </div>

        </div>
    );
}