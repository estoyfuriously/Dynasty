import React from 'react';
import { BookOpen, X, Crown, Heart, Shield, HelpCircle, Dna, FileText } from 'lucide-react';

interface EducationCodexModalProps {
  onClose: () => void;
}

export const EducationCodexModal: React.FC<EducationCodexModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-amber-50 border-4 border-amber-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl text-stone-900 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-amber-900 hover:bg-amber-200/80 rounded-full transition cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-800/30">
          <div className="bg-amber-800 p-3 rounded-xl text-amber-200 shadow">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-serif font-bold text-amber-800 uppercase tracking-widest block">
              World History Curriculum Guide
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-amber-950">
              European Dynastic Succession & Consanguinity Codex
            </h2>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-stone-800 font-serif text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="bg-amber-100/70 p-5 rounded-xl border border-amber-800/20">
            <h3 className="font-bold text-lg text-amber-950 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-800" /> 1. The Land & Dowry Trap: Why Royal Incest Occurred
            </h3>
            <p className="mb-2">
              Modern observers often view royal intermarriage as irrational, but in Early Modern Europe (1450–1750), it was a direct calculation governed by feudal inheritance law and territory preservation.
            </p>
            <ul className="list-disc list-inside space-y-1 text-stone-700 pl-2">
              <li>
                <strong>The Dowry System:</strong> Marrying a foreign princess required surrendering border provinces or paying huge gold dowries to foreign crowns.
              </li>
              <li>
                <strong>Title Fragmentation:</strong> If a princess married outside her family and inherited land, those provinces were legally transferred to a rival dynasty.
              </li>
              <li>
                <strong>Consolidation:</strong> Marrying a 1st cousin or uncle kept Duchies, Kingdoms, and global empires locked inside a single family branch.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-amber-100/70 p-5 rounded-xl border border-amber-800/20">
            <h3 className="font-bold text-lg text-amber-950 mb-2 flex items-center gap-2">
              <Dna className="w-5 h-5 text-red-800" /> 2. Case Study: Charles II of Spain & The Inbreeding Coefficient (F)
            </h3>
            <p className="mb-2">
              The Spanish Habsburg line reached an extreme level of endogamy culminating in <strong>King Charles II of Spain (1661–1700)</strong>, known as <em>El Hechizado</em> ("The Bewitched").
            </p>
            <div className="bg-amber-50 p-3 rounded border border-amber-300 font-mono text-xs space-y-1 mb-2">
              <div>• 9 of his 16 great-great-grandparents were descended from Joanna of Castile.</div>
              <div>• His mother was the niece of his father (Uncle-Niece match).</div>
              <div>• His Inbreeding Coefficient $F = 0.254$ — higher than an offspring born to brother and sister ($F = 0.250$)!</div>
            </div>
            <p className="text-stone-700 text-xs italic">
              His inability to produce an heir caused the extinction of the Spanish Habsburg branch in 1700, triggering the devastating <strong>War of the Spanish Succession (1701–1714)</strong> across all of Europe.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-amber-100/70 p-5 rounded-xl border border-amber-800/20">
            <h3 className="font-bold text-lg text-amber-950 mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-800" /> 3. Royal Hemophilia & Genetic Traits
            </h3>
            <p className="mb-2">
              Beyond the famous <strong>Habsburg Jaw</strong> (mandibular prognathism), intermarriage spread recessive gene mutations across European courts.
            </p>
            <p className="text-stone-700">
              Queen Victoria of Great Britain passed an X-linked hemophilia B mutation through marriages to the royal houses of Germany, Spain, and Russia. Tsarevich Alexei of Russia’s struggle with hemophilia directly influenced Rasputin’s court power and the downfall of the Romanov dynasty in 1917.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-amber-200/60 p-5 rounded-xl border border-amber-800/30">
            <h3 className="font-bold text-lg text-amber-950 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-900" /> 4. History Classroom Discussion Questions
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-stone-800 font-medium">
              <li>Were European monarchs rational or irrational when they prioritized land titles over biological health?</li>
              <li>How did the Treaty of Utrecht (1713) attempt to solve the problem of single dynasties accumulating too many European crowns?</li>
              <li>Compare the strategy of House Habsburg ("Let others wage war; you, happy Austria, marry") with House Hohenzollern’s militaristic expansion.</li>
            </ol>
          </section>
        </div>

        {/* Close Modal Footer */}
        <div className="mt-6 pt-4 border-t border-amber-800/20 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-amber-100 font-serif font-bold text-sm rounded shadow transition cursor-pointer"
          >
            Return to Dynasty Court
          </button>
        </div>
      </div>
    </div>
  );
};
