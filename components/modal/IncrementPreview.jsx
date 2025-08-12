'use client'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'


const IncrementPreview = ({ isOpen, onClose, incrementsData }) => {


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger />
           

            <DialogContent
                className="!top-4 !translate-y-0 w-full max-w-[60vw] max-h-[140vw] overflow-auto "
                onInteractOutside={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
            >
                 <DialogTitle>Increment Detail ({incrementsData?.name})</DialogTitle>
                <div className="max-h-[80vh] overflow-y-auto pt-2">
                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Name</h3>
                            <span>{incrementsData?.name}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Acewebx Tenure</h3>
                            <span>{incrementsData?.acewebxTenure}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Total Experience</h3>
                            <span>{incrementsData?.totalExperience}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Experience With Acewebx</h3>
                            <span>{incrementsData?.experienceWithAcewebx}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Total Projects</h3>
                            <span>{incrementsData?.totalProjects}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Rating On Projects</h3>
                            <span>{incrementsData?.ratingOnProjects}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Client Calls</h3>
                            <span>{incrementsData?.clientCalls}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Client Converted</h3>
                            <span>{incrementsData?.clientConverted}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">New Skills</h3>
                            <span>{incrementsData?.newSkills}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Improvement Areas</h3>
                            <span>{incrementsData?.improvementAreas}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Current Salary</h3>
                            <span>{incrementsData?.currentSalary}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Expected Salary</h3>
                            <span>{incrementsData?.expectedSalary}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Raise Justified</h3>
                            <span>{incrementsData?.raiseJustified}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Short Term Goals</h3>
                            <span>{incrementsData?.shortTermGoals}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Long Term Goals</h3>
                            <span>{incrementsData?.longTermGoals}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Weaknesses</h3>
                            <span>{incrementsData?.weaknesses}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Key Achievements</h3>
                            <span>{incrementsData?.keyAchievements}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Suggestions</h3>
                            <span>{incrementsData?.suggestions}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Reviewed By</h3>
                            <span>{incrementsData?.reviewedBy}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Review Date</h3>
                            <span>{incrementsData?.reviewDate}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Performance Rating</h3>
                            <span>{incrementsData?.performanceRating}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Strengths By Reporting Manager</h3>
                            <span>{incrementsData?.strengthsByReportingManager}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Areas Of Improvement</h3>
                            <span>{incrementsData?.areasOfImprovement}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Manager Comments</h3>
                            <span>{incrementsData?.managerComments}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Recommended Raise</h3>
                            <span>{incrementsData?.recommendedRaise}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Promotion Recommendation</h3>
                            <span>{incrementsData?.promotionRecommendation}</span>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-1 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Promotion Details</h3>
                            <span>{incrementsData?.promotionDetails}</span>
                        </div>
                        {/* <div>
                            <h3 className="capitalize font-[500]">Created At</h3>
                            <span>{incrementsData?.createdAt}</span>
                        </div> */}
                    </div>

                    {/* <div className="mb-4 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Updated At</h3>
                            <span>{incrementsData?.updatedAt}</span>
                        </div>
                    </div> */}
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default IncrementPreview
