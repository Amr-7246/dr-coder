/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldGroup, Field, FieldLabel } from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import React from 'react'
import { ProjectFormState } from "@/src/app/types/types"
import { 
    Link, 
    Image, 
    Video, 
    Palette, 
    Globe,
    FolderGit2,
    Upload,
    ImageIcon,
    RefreshCw,
    Trash2
} from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo, CldUploadButton, CldImage } from 'next-cloudinary'

type UpdateFieldFn = <key extends keyof ProjectFormState>( key: key,  value: ProjectFormState[key] ) => void

const MediaStep = ({ formData, updateField }: { formData: ProjectFormState, updateField: UpdateFieldFn }) => {
    //& Cloudinary upload logic handlers
        const handleThumbUpload = (results: CloudinaryUploadWidgetResults) => {
            if (results.info && typeof results.info !== "string") {
                const info = results.info as CloudinaryUploadWidgetInfo
                updateField("thumbUrl", info.secure_url);
            }
        };

        const handleIconUpload = (results: CloudinaryUploadWidgetResults) => {
            if (results.info && typeof results.info !== "string") {
                const info = results.info as CloudinaryUploadWidgetInfo
                updateField("iconUrl", info.secure_url);
            }
        };
    return (
        <div className="w-full shrink-0">
        <h2>Step 2: Media & Links</h2>
            <FieldGroup className="space-y-4">
                {/* Links Section */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                        <Link className="h-4 w-4" />
                        Links
                    </h3>
                    
                    <Field>
                        <FieldLabel htmlFor="live-link">Live Link</FieldLabel>
                        <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            id="live-link"
                            type="url"
                            value={formData.liveLink || ''}
                            onChange={(e) => updateField("liveLink", e.target.value)}
                            placeholder="https://your-project.com"
                            className="pl-9"
                        />
                        </div>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="repo-link">Repository Link</FieldLabel>
                        <div className="relative">
                        <FolderGit2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            id="repo-link"
                            type="url"
                            value={formData.repoLink || ''}
                            onChange={(e) => updateField("repoLink", e.target.value)}
                            placeholder="https://github.com/username/repo"
                            className="pl-9"
                        />
                        </div>
                    </Field>
                </div>

                {/* Media Section */}
                <div className="space-y-4 pt-2 border-t border-border">
                    <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        Media Assets
                    </h3>

                    {/* Thumbnail Upload Widget */}
                    <Field>
                        <FieldLabel>Project Thumbnail</FieldLabel>
                        {!formData.thumbUrl ? (
                            <CldUploadButton 
                                uploadPreset="dr-coder" 
                                onSuccess={handleThumbUpload} 
                                className="w-full text-sm cursor-pointer cursor-pointer bg-card hover:bg-muted border border-border h-10 rounded-xl flex items-center justify-center gap-2 text-muted-foreground transition-colors"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Thumbnail Banner
                            </CldUploadButton>
                        ) : (
                            <div className="relative group rounded-xl overflow-hidden border border-border h-32 w-full bg-neutral-900">
                                <CldImage src={formData.thumbUrl} alt="Thumbnail Preview" fill sizes="400px" crop="fill" gravity="auto" quality="auto" className="object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <CldUploadButton uploadPreset="dr-coder" onSuccess={handleThumbUpload}>
                                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full"><RefreshCw className="h-4 w-4" /></Button>
                                    </CldUploadButton>
                                    <Button size="icon" variant="destructive" onClick={() => updateField("thumbUrl", "")} className="h-8 w-8 rounded-full"><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        )}
                    </Field>
                    
                    {/* Project Gallery Section */}
                    <div className="space-y-4 pt-2 border-t border-border">
                        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Project Gallery Showcase
                        </h3>

                        <Field>
                            <FieldLabel>Gallery Images ({formData.projectMedia?.length || 0})</FieldLabel>
                            
                            {/* Multi-Image Upload Widget Trigger */}
                            <CldUploadButton 
                                uploadPreset="dr-coder" 
                                onSuccess={(results: CloudinaryUploadWidgetResults) => {
                                    if (results.info && typeof results.info !== "string") {
                                        const currentMedia = formData.projectMedia || [];
                                        updateField("projectMedia", [...currentMedia, results.info.secure_url]);
                                    }
                                }} 
                                options={{ multiple: true, clientAllowedFormats: ["png", "jpg", "jpeg", "webp"] }} //! Configures Cloudinary widget to support selecting multiple items at once
                                className="w-full text-sm cursor-pointer bg-card hover:bg-muted border border-border h-10 rounded-xl flex items-center justify-center gap-2 text-muted-foreground transition-colors"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Showcase Images
                            </CldUploadButton>

                            {/* Interactive Gallery Preview Grid */}
                            {formData.projectMedia && formData.projectMedia.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                                    {formData.projectMedia.map((imgUrl, idx) => (
                                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-border h-28 bg-neutral-900">
                                            
                                            {/* Optimized Responsive Grid Image Delivery */}
                                            <CldImage 
                                                src={imgUrl} 
                                                alt={`Gallery preview ${idx + 1}`} 
                                                fill 
                                                sizes="(max-width: 768px) 50vw, 33vw" 
                                                crop="fill" 
                                                gravity="auto" 
                                                quality="auto" 
                                                className="object-cover" 
                                            />

                                            {/* Hover Management Actions */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                                                <CldUploadButton 
                                                    uploadPreset="dr-coder" 
                                                    onSuccess={(results: CloudinaryUploadWidgetResults) => {
                                                        if (results.info && typeof results.info !== "string") {
                                                            const updated = [...(formData.projectMedia || [])];
                                                            updated[idx] = results.info.secure_url;
                                                            updateField("projectMedia", updated);
                                                        }
                                                    }}
                                                    options={{ clientAllowedFormats: ["png", "jpg", "jpeg", "webp"] }}
                                                >
                                                    <Button size="icon" variant="secondary" className="h-7 w-7 rounded-full">
                                                        <RefreshCw className="h-3.5 w-3.5" />
                                                    </Button>
                                                </CldUploadButton>
                                                
                                                <Button 
                                                    size="icon" 
                                                    variant="destructive" 
                                                    onClick={() => {
                                                        const updated = (formData.projectMedia || []).filter((_, i) => i !== idx);
                                                        updateField("projectMedia", updated);
                                                    }} 
                                                    className="h-7 w-7 rounded-full"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Field>
                    </div>

                    {/* Icon Upload Widget */}
                    <Field>
                        <FieldLabel>Project Icon Layer</FieldLabel>
                        {!formData.iconUrl ? (
                            <CldUploadButton 
                                uploadPreset="dr-coder" 
                                onSuccess={handleIconUpload} 
                                className="w-full text-sm cursor-pointer cursor-pointer bg-card hover:bg-muted border border-border h-10 rounded-xl flex items-center justify-center gap-2 text-muted-foreground transition-colors"
                            >
                                <ImageIcon className="h-4 w-4" />
                                Upload Branding Icon
                            </CldUploadButton>
                        ) : (
                            <div className="relative group rounded-xl overflow-hidden border border-border h-32 w-full bg-neutral-900">
                                <CldImage src={formData.iconUrl} alt="Icon Preview" fill sizes="400px" crop="scale" quality="auto" className="object-contain p-4" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <CldUploadButton uploadPreset="dr-coder" onSuccess={handleIconUpload}>
                                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full"><RefreshCw className="h-4 w-4" /></Button>
                                    </CldUploadButton>
                                    <Button size="icon" variant="destructive" onClick={() => updateField("iconUrl", "")} className="h-8 w-8 rounded-full"><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="icon-color">Icon Background Color Accent</FieldLabel>
                        <div className="relative">
                        <Palette className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            id="icon-color"
                            type="text"
                            value={formData.iconColor || ''}
                            onChange={(e) => updateField("iconColor", e.target.value)}
                            placeholder="#ec5627"
                            className="pl-9"
                        />
                        </div>
                    </Field>
                </div>

                {/* Video Section */}
                <div className="space-y-4 pt-2 border-t border-border">
                    <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Videos
                    </h3>

                    <Field>
                        <FieldLabel>Project Videos Gallery</FieldLabel>
                        
                        {/* Dynamic Video Upload Widget Trigger */}
                        <CldUploadButton 
                            uploadPreset="dr-coder" 
                            onSuccess={(results: CloudinaryUploadWidgetResults) => {
                                if (results.info && typeof results.info !== "string") {
                                    const currentVideos = formData.videos || [];
                                    updateField("videos", [...currentVideos, results.info.secure_url]);
                                }
                            }} 
                            options={{ clientAllowedFormats: ["mp4", "webm", "ogg", "mov"] }} //!/ Enforces only video formats in the widget selection
                            className="w-full text-sm cursor-pointer bg-card hover:bg-muted border border-border h-10 rounded-xl flex items-center justify-center gap-2 text-muted-foreground transition-colors"
                        >
                            <Upload className="h-4 w-4" />
                            Upload Project Video Asset
                        </CldUploadButton>

                        {/* Interactive Video Collection Preview Grid */}
                        {formData.videos && formData.videos.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {formData.videos.map((videoUrl, idx) => (
                                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-border h-48 bg-neutral-950 flex items-center justify-center">
        
                                        <video 
                                            src={videoUrl} 
                                            controls 
                                            muted 
                                            className="w-full h-full object-cover" 
                                        />

                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                                            <CldUploadButton 
                                                uploadPreset="dr-coder" 
                                                onSuccess={(results: CloudinaryUploadWidgetResults) => {
                                                    if (results.info && typeof results.info !== "string") {
                                                        const updated = [...(formData.videos || [])];
                                                        updated[idx] = results.info.secure_url;
                                                        updateField("videos", updated);
                                                    }
                                                }}
                                                options={{ clientAllowedFormats: ["mp4", "webm", "ogg", "mov"] }}
                                            >
                                                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                                                    <RefreshCw className="h-4 w-4" />
                                                </Button>
                                            </CldUploadButton>
                                            <Button 
                                                size="icon" 
                                                variant="destructive" 
                                                onClick={() => {
                                                    const updated = (formData.videos || []).filter((_, i) => i !== idx);
                                                    updateField("videos", updated);
                                                }} 
                                                className="h-8 w-8 rounded-full"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Field>
                </div>

            </FieldGroup>
        </div>
    )
}

export default MediaStep