'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getProjects, type Project } from '@/actions/website';
import { ProjectCard } from '@/components/cards/ProjectCard';

const ProjectsSection = () => {
    const t = useTranslations('ProjectsSection');
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block text-primary font-semibold mb-4 text-sm uppercase tracking-wider">
                        {t('subtitle')}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        // Skeleton loading
                        [...Array(6)].map((_, index) => (
                            <ProjectCard key={index} isLoading />
                        ))
                    ) : projects.length > 0 ? (
                        projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            {t('noProjects')}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
