import GalaxyBackground from "@/components/GalaxyBackground";
import ChapterNav from "@/components/ChapterNav";
import ChapterIntro from "@/components/ChapterIntro";
import ChapterEducation from "@/components/ChapterEducation";
import ChapterSkills from "@/components/ChapterSkills";
import ChapterProjects from "@/components/ChapterProjects";
import ChapterExperience from "@/components/ChapterExperience";
import ChapterAchievements from "@/components/ChapterAchievements";
import ChapterClosing from "@/components/ChapterClosing";
import StoryProgress from "@/components/StoryProgress";
import AIAssistant from "@/components/AIAssistant";
import TechMarquee from "@/components/TechMarquee";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
    return (
        <main className="relative min-h-screen text-foreground bg-transparent selection:bg-play/25 selection:text-white">
            <GalaxyBackground />
            <CustomCursor />
            <StoryProgress />
            <ChapterNav />

            <div className="relative z-10">
                <ChapterIntro />
                <TechMarquee />
                <ChapterEducation />
                <ChapterSkills />
                <ChapterProjects />
                <ChapterExperience />
                <ChapterAchievements />
                <ChapterClosing />
            </div>

            <AIAssistant />
        </main>
    );
}
