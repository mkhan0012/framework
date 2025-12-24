export const CaseStudy = () => {
    return (
      <div className="max-w-3xl mx-auto py-24 px-8 text-zinc-300 font-mono">
        
        <div className="mb-16 border-l-2 border-zinc-800 pl-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">FRAMEWORK</h1>
          <div className="text-sm text-blue-500 uppercase tracking-widest">Truth Under Systems</div>
        </div>
  
        <div className="space-y-12 text-sm leading-relaxed">
          
          <section>
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">01. Concept</h3>
              <p>
                  FRAMEWORK is a simulation that treats belief as a systemic output rather than a philosophical object. 
                  Modern information systems do not need to alter belief intentionally. Their structure—engagement bias, 
                  visibility thresholds, propagation loops—selects and reshapes belief automatically.
              </p>
          </section>
  
          <section>
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">02. System Model</h3>
              <ul className="space-y-4 border-l border-zinc-800 pl-4">
                  <li><strong className="text-white">Framing Engine:</strong> Increases emotional transmission value.</li>
                  <li><strong className="text-white">Amplification Engine:</strong> Distributes the most compatible variant.</li>
                  <li><strong className="text-white">Suppression Engine:</strong> Removes visibility without removing presence.</li>
                  <li><strong className="text-white">Mutation Engine:</strong> Simplifies belief into a form optimized for survival.</li>
              </ul>
          </section>
  
          <section>
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">03. Hybrid Architecture</h3>
              <p className="mb-4">
                  The system is built as a deterministic rule-based core (authoritative behavior) coupled with an 
                  optional AI visualization layer.
              </p>
              <div className="bg-zinc-900/50 p-4 text-xs border border-zinc-800">
                  AI does not decide outcomes. It only renders human-readable examples. 
                  The system remains mechanical, repeatable, and explainable.
              </div>
          </section>
  
          <section className="pt-12 border-t border-zinc-900">
              <p className="text-lg text-white font-bold">
                  "Truth does not survive because it is true.<br/>
                  Truth survives because it fits the system that carries it."
              </p>
          </section>
  
        </div>
      </div>
    )
  }