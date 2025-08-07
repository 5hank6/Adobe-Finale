// Mock API responses for testing
export const mockProcessResponse = {
  sections: [
    {
      id: "1",
      title: "Introduction to Machine Learning",
      content: "Machine learning is a subset of artificial intelligence that focuses on algorithms that can learn from data without being explicitly programmed for every task.",
      page: 1,
      insights: [
        "Key concept: supervised vs unsupervised learning",
        "Historical context: emerged in 1950s",
        "Foundation for modern AI applications"
      ],
      highlights: [
        {
          text: "machine learning",
          position: { x: 100, y: 200 },
          type: "definition"
        },
        {
          text: "artificial intelligence",
          position: { x: 150, y: 220 },
          type: "concept"
        }
      ]
    },
    {
      id: "2",
      title: "Neural Networks Fundamentals",
      content: "Neural networks are computing systems inspired by biological neural networks that constitute animal brains.",
      page: 3,
      insights: [
        "Breakthrough: backpropagation algorithm",
        "Connection to human brain structure",
        "Foundation for deep learning"
      ],
      highlights: [
        {
          text: "neural networks",
          position: { x: 120, y: 180 },
          type: "definition"
        }
      ]
    }
  ],
  insights: {
    facts: [
      {
        id: "1",
        title: "Historical Milestone",
        content: "The first neural network was created in 1943 by McCulloch and Pitts",
        confidence: 0.95,
        category: "history"
      }
    ],
    contradictions: [
      {
        id: "1",
        title: "Performance vs Interpretability",
        content: "While neural networks achieve high accuracy, they often lack interpretability",
        severity: "medium",
        sources: ["current_document", "ethics_paper.pdf"]
      }
    ],
    connections: [
      {
        id: "1",
        title: "Related Concept",
        content: "This concept is also discussed in your Statistics document",
        linkedDoc: "statistics.pdf",
        relevance: 0.87
      }
    ]
  },
  relatedContent: [
    {
      id: "1",
      title: "Deep Learning Applications",
      snippet: "Deep learning has revolutionized computer vision and natural language processing",
      relevance: 0.92,
      source: "deep_learning.pdf"
    }
  ]
}

export const apiService = {
  async processDocument(file: File) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real implementation, this would send the file to your FastAPI backend
    // const formData = new FormData()
    // formData.append('file', file)
    // const response = await fetch('http://localhost:8000/process', {
    //   method: 'POST',
    //   body: formData
    // })
    // return response.json()
    
    return mockProcessResponse
  }
}
