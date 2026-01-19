"use client";

import { Leaf, Droplets, Factory, Recycle, MapPin } from "lucide-react";
import { SustainabilityInfo, getSustainabilityGrade } from "@/lib/product-data";

interface SustainabilityBadgeProps {
  sustainability: SustainabilityInfo;
  compact?: boolean;
}

export function SustainabilityBadge({ sustainability, compact = false }: SustainabilityBadgeProps) {
  const { grade, color } = getSustainabilityGrade(sustainability.score);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-sm">
        <Leaf className="w-4 h-4 text-green-600" />
        <span className="font-mono text-xs uppercase">
          Eco Score: <span className={`font-bold ${color}`}>{grade}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 bg-[#FAFAFA] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          <span className="font-mono text-xs uppercase tracking-widest">Sustainability</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-gray-400">Score</span>
          <span className={`font-heading text-2xl ${color}`}>{grade}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
            style={{ width: `${sustainability.score}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[10px] text-gray-400">0</span>
          <span className="font-mono text-[10px] text-gray-400">{sustainability.score}/100</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-start gap-3">
          <Factory className="w-4 h-4 text-gray-400 mt-0.5" />
          <div>
            <span className="font-mono text-[10px] text-gray-400 uppercase block">Carbon</span>
            <span className="font-sans text-sm">{sustainability.carbonFootprint}</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Droplets className="w-4 h-4 text-blue-400 mt-0.5" />
          <div>
            <span className="font-mono text-[10px] text-gray-400 uppercase block">Water</span>
            <span className="font-sans text-sm">{sustainability.waterUsage}</span>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="flex flex-wrap gap-2 mb-4">
        {sustainability.certifications.map((cert) => (
          <span
            key={cert}
            className="px-2 py-1 bg-white border border-gray-200 font-mono text-[10px] uppercase text-gray-600"
          >
            {cert}
          </span>
        ))}
      </div>

      {/* Badges */}
      <div className="flex gap-4 pt-4 border-t border-gray-200">
        {sustainability.recyclablePackaging && (
          <div className="flex items-center gap-1.5">
            <Recycle className="w-4 h-4 text-green-500" />
            <span className="font-mono text-[10px] uppercase text-gray-500">Recyclable Packaging</span>
          </div>
        )}
        {sustainability.madeLocally && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="font-mono text-[10px] uppercase text-gray-500">Made in India</span>
          </div>
        )}
      </div>
    </div>
  );
}
