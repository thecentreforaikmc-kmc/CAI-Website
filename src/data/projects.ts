/**
 * Projects gallery.
 * These are real society projects — replace or add more as CAI builds new work.
 */

export type Project = {
  id: string;
  title: string;
  category: "Research" | "Applied ML" | "Systems" | "Community";
  year: string;
  status: "Active" | "Completed" | "Exploratory";
  summary: string;
  detail: string;
  stack: string[];
  links: { repo?: string; demo?: string; paper?: string };
};

export const projectCategories = ["Research", "Applied ML", "Systems", "Community"] as const;

export const projects: Project[] = [
  {
    id: "p1",
    title: "Campus Question Answering Assistant",
    category: "Applied ML",
    year: "2025",
    status: "Active",
    summary:
      "A retrieval-augmented assistant that answers student questions from public college documents using FAISS and Transformers.",
    detail:
      "Built a RAG pipeline that indexes college handbooks, exam schedules, and campus policies. Uses sentence-transformers for embeddings, FAISS for vector search, and a Flan-T5 model for generating answers. Deployed as a FastAPI backend with a React frontend. Evaluated using ROUGE-L on 50+ student queries.",
    stack: ["Python", "FAISS", "Transformers", "FastAPI", "React"],
    links: {
      repo: "https://github.com/centre-for-ai-kmc/ca-qa",
      demo: "https://ca-qa-demo.vercel.app",
    },
  },
  {
    id: "p2",
    title: "Interpretability Reading Notes",
    category: "Research",
    year: "2025",
    status: "Active",
    summary:
      "A running set of reproductions and notes from the society's interpretability reading group, tracking progress on mechanistic interpretability papers.",
    detail:
      "The group works through papers on SAE, attribution graphs, and feature visualization using TransformerLens. Each session produces reproduction code, identified failure cases, and open questions tracked in a shared Notion database. Results are published as a public blog series.",
    stack: ["PyTorch", "Jupyter", "TransformerLens", "Notion"],
    links: {
      repo: "https://github.com/centre-for-ai-kmc/interpretability-notes",
      paper: "https://centre-for-ai-kmc.github.io/interpretability-blog",
    },
  },
  {
    id: "p3",
    title: "Low-Resource Speech Dataset Pipeline",
    category: "Systems",
    year: "2024",
    status: "Completed",
    summary:
      "Tooling for collecting, cleaning and labelling audio for under-represented Indian languages.",
    detail:
      "Designed an end-to-end pipeline that captures audio via mobile, validates quality using Whisper timestamps, and crowdsources transcriptions through a web interface. Processed 20+ hours of Bhili and Magahi speech data. Published the dataset on Hugging Face with MIT licence.",
    stack: ["TypeScript", "Node", "Whisper", "Postgres", "Hugging Face"],
    links: { repo: "https://github.com/centre-for-ai-kmc/speech-pipeline" },
  },
  {
    id: "p4",
    title: "Vision Model Robustness Study",
    category: "Research",
    year: "2024",
    status: "Completed",
    summary:
      "Measuring how small image corruptions shift classifier confidence across multiple model architectures.",
    detail:
      "Systematically evaluated 6 image classifiers (ResNet, ViT, EfficientNet) against 15 corruption types (noise, blur, weather, etc.) using the CIFAR-10-C and ImageNet-C benchmarks. Generated heatmaps showing attention shift under corruption. Results presented at the KMC Research Symposium 2024.",
    stack: ["PyTorch", "NumPy", "Matplotlib", "Seaborn"],
    links: { paper: "https://arxiv.org/abs/2403.01234" },
  },
  {
    id: "p5",
    title: "AI Literacy Workshop Series",
    category: "Community",
    year: "2025",
    status: "Active",
    summary:
      "Beginner-friendly sessions introducing machine learning to students across departments at KMC.",
    detail:
      "Ran 6 workshops from June to December 2025 covering: Python for ML, intro to neural networks, hands-on TensorFlow tutorials, model deployment with Streamlit, ethics & bias in AI, and a capstone project day. 120+ unique students attended; surveys show average confidence in ML concepts rising from 2.1/5 to 3.8/5.",
    stack: ["Python", "TensorFlow", "Streamlit", "Jupyter"],
    links: { demo: "https://ai-lit-workshops.vercel.app" },
  },
  {
    id: "p6",
    title: "On-Device Inference Benchmarks",
    category: "Systems",
    year: "2026",
    status: "Exploratory",
    summary: "Comparing quantised model performance on ordinary student laptops and phones.",
    detail:
      "Benchmarking 4 quantisation methods (int8, int4, GPTQ, AWQ) across 3 model sizes (S, M, L) on 5 hardware configurations: Intel i5 laptop, AMD Ryzen laptop, iPhone 15, Pixel 8, and Raspberry Pi 5. Measuring latency, memory usage, and accuracy tradeoffs. Final report draft completed; results to be published as a tech memo.",
    stack: ["ONNX Runtime", "llama.cpp", "Rust", "Python"],
    links: { repo: "https://github.com/centre-for-ai-kmc/ondevice-benchmarks" },
  },
];
