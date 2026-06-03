export interface Assessment {
  assessmentId: string;
  title: string;
  description: string;
  assessmentType: string;
  totalQuestions: number;
  totalMarks: number;
  passingMarks: number;
  duration: number;
  difficultyLevel: "Easy" | "Medium" | "Hard";
  totalCandidates: number;
  completedAttempts: number;
  createdAt: string;
}
