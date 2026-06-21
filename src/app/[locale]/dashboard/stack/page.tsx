/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react";
import { CldUploadButton, CldImage, CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Network, Trash2, RefreshCw, GitBranch, Layers, Target } from "lucide-react";
import toast from "react-hot-toast";
import { Textarea } from "@/src/components/ui/textarea";

export default function AdminMetaPage() {
    const [catForm, setCatForm] = useState({ name: "", description: "", thumbUrl: "", sortOrder: 0 });
    const [techForm, setTechForm] = useState({ name: "", role: "", iconUrl: "", sortOrder: 0 });
    const [loading, setLoading] = useState(false);

    //& Cloudinary Upload Handlers
        const handleCatUpload = (results: CloudinaryUploadWidgetResults) => {
            if (results.info && typeof results.info !== "string") {
                const info = results.info as CloudinaryUploadWidgetInfo
                setCatForm(prev => ({ ...prev, thumbUrl: info.secure_url }));
                toast.success("Category thumbnail uploaded successfully AMR!");
            }
        };

        const handleTechUpload = (results: CloudinaryUploadWidgetResults) => {
            if (results.info && typeof results.info !== "string") {
                const info = results.info as CloudinaryUploadWidgetInfo
                setTechForm(prev => ({ ...prev, iconUrl: info.secure_url }));
                toast.success("Tech icon uploaded successfully AMR!");
            }
        };

    //& Submit Operations
        const handleSubmit = async (type: "CATEGORY" | "TECHSTACK", data: any) => {
            if (!data.name.trim()) return toast.error("Name field is mandatory!");
            setLoading(true);
            try {
            const res = await fetch("/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, data })
            });
            const result = await res.json();
            if (result.success) {
                toast.success(`${type === "CATEGORY" ? "Category" : "Tech Stack"} created successfully!`);
                if (type === "CATEGORY") setCatForm({ name: "", description: "", thumbUrl: "", sortOrder: 0 });
                else setTechForm({ name: "", role: "", iconUrl: "", sortOrder: 0 });
            } else {
                toast.error(result.error);
            }
            } catch (err: any) {
            toast.error("Network communication fault: " + err.message);
            } finally {
            setLoading(false);
            }
        };

    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-16 flex flex-col gap-12">
            <div className="border-b border-neutral-800 pb-6">
                <h1 className="text-3xl font-bold tracking-tight text-brand-orange">Database Meta Management</h1>
                <p className="text-neutral-400 text-sm mt-1">Easily introduce new classification constraints and tech stacks to your database schema.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* CATEGORY CREATOR PANEL */}
                <div className="bg-neutral-950  border border-neutral-800 rounded-2xl p-6 flex-center flex-col gap-5 shadow-xl">
                    <div className="w-full flex items-center gap-2 border-b border-neutral-800 pb-3">
                        <GitBranch className="text-brand-orange h-5 w-5" />
                        <h2 className="text-xl font-bold">Add New Category</h2>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-xs text-neutral-400 font-medium block mb-1">Category Name *</label>
                            <Input placeholder="e.g., Full Stack, Mobile Apps" value={catForm.name} onChange={e => setCatForm(p => ({ ...p, name: e.target.value }))} className="bg-neutral-900 border-neutral-800 rounded-xl" />
                        </div>
                        <div>
                            <label className="text-xs text-neutral-400 font-medium block mb-1">Description</label>
                            <Textarea placeholder="Short overview description statement..." value={catForm.description} onChange={e => setCatForm(p => ({ ...p, description: e.target.value }))} className="bg-neutral-900 border-neutral-800 rounded-xl min-h-[80px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-neutral-400 font-medium block mb-1">Sort Order Position</label>
                                <Input type="number" value={catForm.sortOrder} onChange={e => setCatForm(p => ({ ...p, sortOrder: Number(e.target.value) }))} className="bg-neutral-900 border-neutral-800 rounded-xl" />
                            </div>
                            <div>
                                <label className="text-xs text-neutral-400 font-medium block mb-1">Media Asset</label>
                                {!catForm.thumbUrl ? (
                                    <CldUploadButton 
                                        uploadPreset="dr-coder" 
                                        onSuccess={handleCatUpload} 
                                        className="w-full text-sm cursor-pointer bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 h-10 rounded-xl flex items-center justify-center text-neutral-300 transition-colors"
                                    >
                                        Upload Banner
                                    </CldUploadButton>
                                    ) : (
                                    <div className="relative group rounded-xl overflow-hidden border border-neutral-800 h-24 w-full bg-neutral-900">
                                        <CldImage 
                                            src={catForm.thumbUrl} 
                                            alt="Preview" fill sizes="150px" 
                                            crop="fill" gravity="auto" quality="auto" 
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <CldUploadButton uploadPreset="dr-coder" onSuccess={handleCatUpload}>
                                                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full"><RefreshCw className="h-4 w-4" /></Button>
                                            </CldUploadButton>
                                            {/* //TODO: build the delete logic */}
                                            <Button size="icon" variant="destructive" onClick={() => setCatForm(p => ({ ...p, thumbUrl: "" }))} className="h-8 w-8 rounded-full"><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button onClick={() => handleSubmit("CATEGORY", catForm)} disabled={loading} className="w-full mt-2 rounded-xl bg-[var(--orange)] hover:bg-[var(--orange)]/90 text-white font-semibold">
                        <Target className="mr-2 h-4 w-4" /> Create Category
                    </Button>
                </div>

                {/* TECH STACK CREATOR PANEL = */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex-center flex-col gap-5 shadow-xl">
                    <div className="w-full flex items-center gap-2 border-b border-neutral-800 pb-3">
                        <Layers className="text-brand-green h-5 w-5" />
                        <h2 className="text-xl font-bold">Add New Tech Stack</h2>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-xs text-neutral-400 font-medium block mb-1">Tech Name *</label>
                            <Input placeholder="e.g., Next.js, Prisma, Docker" value={techForm.name} onChange={e => setTechForm(p => ({ ...p, name: e.target.value }))} className="bg-neutral-900 border-neutral-800 rounded-xl" />
                        </div>
                        <div>
                            <label className="text-xs text-neutral-400 font-medium block mb-1">Target Development Role</label>
                            <Input placeholder="e.g., Frontend Framework, ORM Database" value={techForm.role} onChange={e => setTechForm(p => ({ ...p, role: e.target.value }))} className="bg-neutral-900 border-neutral-800 rounded-xl" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-neutral-400 font-medium block mb-1">Sort Order Position</label>
                                <Input type="number" value={techForm.sortOrder} onChange={e => setTechForm(p => ({ ...p, sortOrder: Number(e.target.value) }))} className="bg-neutral-900 border-neutral-800 rounded-xl" />
                            </div>
                            <div>
                                <label className="text-xs text-neutral-400 font-medium block mb-1">Vector/Image Icon</label>
                                {!techForm.iconUrl ? (
                                <CldUploadButton uploadPreset="dr-coder" onSuccess={handleTechUpload} className="w-full text-sm cursor-pointer bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 h-10 rounded-xl flex items-center justify-center text-neutral-300 transition-colors">
                                    Upload Icon
                                </CldUploadButton>
                                ) : (
                                <div className="relative group rounded-xl overflow-hidden border border-neutral-800 h-24 w-full bg-neutral-900">
                                    <CldImage src={techForm.iconUrl} alt="Preview" fill sizes="150px" crop="scale" quality="auto" className="object-contain p-2" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <CldUploadButton uploadPreset="dr-coder" onSuccess={handleTechUpload}>
                                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full"><RefreshCw className="h-4 w-4" /></Button>
                                        </CldUploadButton>
                                            {/* //TODO: build the delete logic */}
                                        <Button size="icon" variant="destructive" onClick={() => setTechForm(p => ({ ...p, iconUrl: "" }))} className="h-8 w-8 rounded-full"><Trash2 className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button onClick={() => handleSubmit("TECHSTACK", techForm)} disabled={loading} className="w-full mt-2 rounded-xl bg-[var(--green)] hover:bg-[var(--green)]/90 text-white font-semibold">
                        <Network className="mr-2 h-4 w-4" /> Create Tech Stack
                    </Button>
                </div>

            </div>
        </div>
    );
}
