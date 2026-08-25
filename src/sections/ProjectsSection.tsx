import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { PROJECTS_DATA } from '../data/portfolioData';
import type { Project } from '../types';
import { CaseStudyModal } from '../components/modals/CaseStudyModal';
import { ArrowRight, Maximize2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndexMap, setActiveImageIndexMap] = useState<Record<string, number>>({});

  const getImageIndex = (projectId: string) => activeImageIndexMap[projectId] || 0;
  const setImageIndex = (projectId: string, index: number) => {
    setActiveImageIndexMap((prev) => ({ ...prev, [projectId]: index }));
  };

  return (
    <section id="projects" className="py-32 bg-[#000000] text-[#F5F5F7] relative overflow-hidden border-t border-white/10 scroll-mt-32 sm:scroll-mt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="03"
          category="Featured Analytics Work"
          title="SELECTED CASE STUDIES."
          subtitle="Deep-dive analytical pipelines built with SQL, Python, and Power BI. Designed like Apple product pages."
          darkTheme={true}
        />

        <div className="space-y-28">
          {PROJECTS_DATA.map((project, index) => {
            const hasImages = project.projectImages && project.projectImages.length > 0;
            const currentImgIdx = getImageIndex(project.id);
            const currentImg = hasImages ? project.projectImages![currentImgIdx] : null;

            return (
              <motion.div
                key={project.id}
                id={`project-${project.id}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="apple-card-dark p-8 sm:p-12 border border-white/10 relative overflow-hidden group shadow-2xl scroll-mt-32"
              >
                {/* Product Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0071E3] text-white">
                      PROJECT {project.number}
                    </span>
                    <span className="text-sm font-sans text-[#A1A1A6]">
                      {project.category}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#A1A1A6]">
                    {project.date}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  {/* Left Specs Column */}
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display text-white tracking-tight leading-none mb-3">
                        {project.title}
                      </h3>
                      <p className="text-base sm:text-lg text-[#A1A1A6] font-sans leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Bento Spec Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1A6] mb-1">
                          Dataset Scale
                        </div>
                        <div className="text-xl sm:text-2xl font-bold font-display text-white">
                          {project.datasetScale}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1A6] mb-1">
                          Model Metric
                        </div>
                        <div className="text-xl sm:text-2xl font-bold font-display text-white">
                          {project.primaryMetricValue}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1A6] mb-1">
                          SQL Data Model
                        </div>
                        <div className="text-xl sm:text-2xl font-bold font-display text-white">
                          Star Schema
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1A6] mb-1">
                          Power BI Delivery
                        </div>
                        <div className="text-xl sm:text-2xl font-bold font-display text-white">
                          {project.dashboardPagesCount}-Page Dashboard
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="apple-btn-blue px-6 py-3 text-sm font-sans font-medium inline-flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                      >
                        <span>Explore case study</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Image / Visualization Interactive Gallery */}
                  <div className="lg:col-span-6 space-y-3">
                    {hasImages && currentImg && (
                      <div className="space-y-3">
                        <div className="text-xs font-mono uppercase tracking-wider text-[#0071E3] font-semibold flex items-center justify-between">
                          <span>Key Analytical Finding Charts</span>
                          <span className="text-[#A1A1A6] font-normal">Click image to enlarge</span>
                        </div>

                        {/* Interactive Main Chart Image */}
                        <div
                          onClick={() => setSelectedProject(project)}
                          className="bg-white rounded-2xl p-3 border border-white/10 cursor-pointer group hover:opacity-95 transition-opacity relative overflow-hidden flex items-center justify-center min-h-[240px]"
                        >
                          <img
                            src={currentImg.src}
                            alt={currentImg.title}
                            className="max-h-[230px] w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-mono flex items-center gap-1 shadow-md">
                            <Maximize2 className="w-3 h-3 text-[#0071E3]" />
                            <span>View case study</span>
                          </div>
                        </div>

                        <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1 font-sans">
                          <div className="text-xs font-semibold text-white font-mono flex items-center justify-between">
                            <span>{currentImg.title}</span>
                            <span className="text-[#0071E3] text-[11px]">{currentImgIdx + 1} / {project.projectImages!.length}</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {currentImg.caption}
                          </p>
                        </div>

                        {/* Image Tabs Grid */}
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 pt-1">
                          {project.projectImages!.map((img, imgIdx) => {
                            const shortLabel =
                              img.title.includes('Crop Class') || img.title.includes('Distribution') ? 'Crops' :
                              img.title.includes('Correlation') || img.title.includes('Heatmap') ? 'Heatmap' :
                              img.title.includes('Boxplot') || img.title.includes('EDA') ? 'Boxplots' :
                              img.title.includes('Algorithm') || img.title.includes('Comparison') ? 'Models' :
                              img.title.includes('ER') || img.title.includes('Entity') ? 'ER Diagram' :
                              img.title.includes('Mutual') || img.title.includes('Feature Selection') ? 'Mutual Info' :
                              img.title.includes('Curves') || img.title.includes('Training') ? 'Curves' :
                              img.title.includes('Matrix') || img.title.includes('Confusion') ? 'Matrix' :
                              img.title.includes('ROC') ? 'ROC Curve' :
                              img.title.includes('SHAP') ? 'SHAP' :
                              img.title.includes('Contract') ? 'Contract' :
                              img.title.includes('Tenure') ? 'Tenure' :
                              img.title.includes('MRR') || img.title.includes('Revenue') ? 'MRR Risk' :
                              img.title.includes('Segment') ? 'Segment' :
                              img.title.includes('Root') ? 'Root Cause' :
                              img.title.includes('ROAS') ? 'ROAS' :
                              img.title.includes('CPA') ? 'CPA' :
                              img.title.includes('Monthly') ? 'Monthly' :
                              img.title.includes('Scatter') ? 'Scatter' :
                              img.title.includes('Underperforming') ? 'Low ROI' :
                              `Chart ${imgIdx + 1}`;

                            const isSelected = currentImgIdx === imgIdx;
                            return (
                              <button
                                key={imgIdx}
                                onClick={() => setImageIndex(project.id, imgIdx)}
                                className={`px-1 sm:px-2 py-1.5 rounded-xl text-center transition-all cursor-pointer border overflow-hidden flex flex-col items-center justify-center ${
                                  isSelected
                                    ? 'bg-[#0071E3] text-white border-[#0071E3] font-semibold shadow-md scale-[1.02]'
                                    : 'bg-white/5 text-[#A1A1A6] border-white/10 hover:bg-white/10 hover:text-white'
                                }`}
                                title={img.title}
                              >
                                <span className="block text-[9px] font-mono opacity-80 font-bold leading-none mb-0.5">0{imgIdx + 1}</span>
                                <span className="block text-[10px] sm:text-[11px] font-sans font-medium leading-tight whitespace-nowrap">{shortLabel}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Visualizer 1: Churn Flow Fallback */}
                    {!hasImages && project.visualType === 'churn-flow' && (
                      <div className="space-y-6">
                        <div className="text-sm font-sans text-slate-300">
                          Customer Retention & Risk Segmentation:
                        </div>

                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                            <span>01 CUSTOMER COHORT</span>
                            <span className="text-white font-bold">5,000 Records</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                            <span>02 RETENTION PIPELINE</span>
                            <span className="text-white font-bold">10+ SQL Queries</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-[#0071E3]/20 border border-[#0071E3]/40 flex justify-between items-center text-white">
                            <span>03 LOGISTIC REGRESSION</span>
                            <span className="text-[#0071E3] font-bold text-base">0.68 ROC-AUC</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                            <span>04 POWER BI SUITE</span>
                            <span className="text-white font-bold">4 Executive Pages</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visualizer 2: Sales Landscape */}
                    {!hasImages && project.visualType === 'sales-landscape' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-sm font-sans text-slate-300">
                          <span>Seasonality Revenue Curve:</span>
                          <span className="text-[#0071E3] font-bold">$4.64M Revenue</span>
                        </div>

                        <div className="h-28 flex items-end justify-between gap-2 border-b border-white/10 pb-2">
                          <div className="w-full bg-[#0071E3]/40 h-[35%] rounded-t" />
                          <div className="w-full bg-[#0071E3]/50 h-[45%] rounded-t" />
                          <div className="w-full bg-[#0071E3]/70 h-[60%] rounded-t" />
                          <div className="w-full bg-[#0071E3] h-[95%] rounded-t" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <span className="text-[#A1A1A6] block">Seasonal Variance:</span>
                            <span className="text-white font-bold">40–60% Demand</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <span className="text-[#A1A1A6] block">Order Volume:</span>
                            <span className="text-white font-bold">6,583 Orders</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visualizer 3: Marketing ROI */}
                    {!hasImages && project.visualType === 'marketing-funnel' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-sm font-sans text-slate-300">
                          <span>Marketing Spend Efficiency:</span>
                          <span className="text-emerald-400 font-bold">7.06x ROAS</span>
                        </div>

                        <div className="space-y-2.5 font-mono text-xs">
                          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                            <span className="text-[#A1A1A6]">Audited Spend:</span>
                            <span className="text-white font-bold">$860K</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                            <span className="text-[#A1A1A6]">Campaign Coverage:</span>
                            <span className="text-white font-bold">40 Campaigns / 5 Channels</span>
                          </div>
                          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex justify-between text-emerald-300">
                            <span>Target Optimization:</span>
                            <span className="font-bold">12 Flagged Campaigns</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
