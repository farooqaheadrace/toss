const CandidateStatus =
{
    CandidateArchived: {
        Code: "CandidateArchived",
        Description: "Candidate Archived.",
        NextSteps: "",
        NextCodes: []
    },
    InitialDiscussionDone: {
        Code: "InitialDiscussionDone",
        Description: "Initial discussions completed",
        NextSteps: "Analysis of Job History for past 5 years done?",
        NextCodes: ["JobHistoryAnalysisPostive", "JobHistoryAnalysisNegative"]
    },
    JobHistoryAnalysisPostive: {
        Code: "JobHistoryAnalysisPostive",
        Description: "Job history for past 5 years sounds favourable",
        NextSteps: "Analysis of history for salary increment, technical experience, time of the year for job change done ?",
        NextCodes: ["SalaryTechTimeofYearPositive", "SalaryTechTimeofYearNegative"]
    },
    JobHistoryAnalysisNegative: {
        Code: "JobHistoryAnalysisNegative",
        Description: "Job history for past 5 years is not favourable",
        NextSteps: "Please update job history flag for later use of this candidate",
        NextCodes: ["CandidateArchived"]
    },
    SalaryTechTimeofYearPositive: {
        Code: "SalaryTechTimeofYearPositive",
        Description: "History for salary increment, technical experience, time of the year for job change sounds positive",
        NextSteps: "Technical and Manager Rounds of Interviews done?",
        NextCodes: ["TechnicalAndManagerDiscussionsPositive", "TechnicalAndManagerDiscussionsNegative"]
    },
    SalaryTechTimeofYearNegative: {
        Code: "SalaryTechTimeofYearNegative",
        Description: "History for salary increment, technical experience, time of the year for job change sounds positive",
        NextSteps: "Archive the candidate.",
        NextCodes: ["CandidateArchived"]
    },
    TechnicalAndManagerDiscussionsPositive: {
        Code: "TechnicalAndManagerDiscussionsPositive",
        Description: "Technical and Manager discussions were positive",
        NextSteps: "Candidate Selected?",
        NextCodes: ["CandidateSelected", "CandidateArchived"]
    },
    TechnicalAndManagerDiscussionsNegative: {
        Code: "TechnicalAndManagerDiscussionsNegative",
        Description: "Technical and Manager discussions were negative",
        NextSteps: "Please update technical failure",
        NextCodes: ["CandidateArchived"]
    },
    CandidateSelected: {
        Code: "CandidateSelected",
        Description: "Candidate Selected",
        NextSteps: "Candidate Offer Discussion done and Offer sent?",
        NextCodes: ["JobOffered", "CandidateArchived"]
    },
    JobOffered: {
        Code: "JobOffered",
        Description: "Job Offered",
        NextSteps: "Move to Onboard",
        NextCodes: ["CandidateOnboard", "CandidateArchived"]
    },
    CandidateOnboard: {
        Code: "CandidateOnboard",
        Description: "Candidate On Board",
        NextSteps: "Was Week #1 Buddy Discussions feedback positive?",
        NextCodes: ["BuddyWeek1Positive", "BuddyWeek1Negative"]
    },
    BuddyWeek1Positive: {
        Code: "BuddyWeek1Positive",
        Description: "Buddy discussion week #1 was positive.",
        NextSteps: "Was Pluralsight access given on Week #3?",
        NextCodes: ["PluralSightAccessGiven"]
    },
    PluralSightAccessGiven: {
        Code: "PluralSightAccessGiven",
        Description: "PluralSight access given.",
        NextSteps: "Take the candidate quiz.",
        NextCodes: ["CandidateQuizTaken"]
    },
    CandidateQuizTaken: {
        Code: "CandidateQuizTaken",
        Description: "Candidate has taken the quiz.",
        NextSteps: "Was the Buddy discussion #2 feedback positive?",
        NextCodes: ["BuddyWeek5Positive", "BuddyWeek5Negative"]
    },
    BuddyWeek5Negative: {
        Code: "BuddyWeek5Negative",
        Description: "Buddy discussion #2 feedback was negative.",
        NextSteps: "Discuss to rollback offer and inform the candidate",
        NextCodes: ["SentFormalLetterToBackupCandidate"]
    },
    BuddyWeek5Positive: {
        Code: "BuddyWeek5Positive",
        Description: "Buddy discussion #2 feedback was positive.",
        NextSteps: "Check the quiz responses.",
        NextCodes: ["QuizResponsesChecked"]
    },
    QuizResponsesChecked: {
        Code: "QuizResponsesChecked",
        Description: "Quiz responses were checked.",
        NextSteps: "Open house with management on Week #6, Was the feedback positive?",
        NextCodes: ["OpenhouseWithManagementWeek6Positive", "OpenhouseWithManagementWeek6Negative"]
    },
    OpenhouseWithManagementWeek6Negative: {
        Code: "OpenhouseWithManagementWeek6Negative",
        Description: "Open house with management on Week #6, Feedback was negative.",
        NextSteps: "Discuss to rollback offer and inform the candidate",
        NextCodes: ["SentFormalLetterToBackupCandidate"]
    },
    OpenhouseWithManagementWeek6Positive: {
        Code: "OpenhouseWithManagementWeek6Positive",
        Description: "Open house with management on Week #6, Feedback was positive.",
        NextSteps: "Get the HR discussion on special benefits done.",
        NextCodes: ["HRDiscussionsDone"]
    },
    HRDiscussionsDone: {
        Code: "HRDiscussionsDone",
        Description: "HR Discussions on special bonus done.",
        NextSteps: "Did the candidate join?",
        NextCodes: ["CandidateJoined", "CandidateDidNotJoin"]
    },
    CandidateDidNotJoin: {
        Code: "CandidateDidNotJoin",
        Description: "Candidate did not join.",
        NextSteps: "Discuss to rollback offer and inform the candidate",
        NextCodes: ["SentFormalLetterToBackupCandidate"]
    },
    CandidateJoined: {
        Code: "CandidateJoined",
        Description: "Candidate Joined.",
        NextSteps: "Onboard process done?",
        NextCodes: ["OnboardProcessDone"]
    },
    OnboardProcessDone: {
        Code: "OnboardProcessDone",
        Description: "On-board process done.",
        NextSteps: "Employee Referal Bonus given?",
        NextCodes: ["EmployeeReferalBonusGiven"]
    },
    EmployeeReferalBonusGiven: {
        Code: "EmployeeReferalBonusGiven",
        Description: "Employee Referal Bonus Given.",
        NextSteps: "Buddy Program Incentive Released?",
        NextCodes: ["BuddyProgramIncentiveReleased"]
    },
    BuddyProgramIncentiveReleased: {
        Code: "BuddyProgramIncentiveReleased",
        Description: "Buddy Program Incentive Released.",
        NextSteps: "-",
        NextCodes: []
    },
    BuddyWeek1Negative: {
        Code: "BuddyWeek1Negative",
        Description: "Buddy discussion week #1 was negative.",
        NextSteps: "Open house with management done on Week #2, Was the feedback positive?",
        NextCodes: ["OpenhouseWithManagementPositive", "OpenhouseWithManagementNegative"]
    },
    OpenhouseWithManagementPositive: {
        Code: "OpenhouseWithManagementNegative",
        Description: "Open house with management done on Week #2 and feedback was positive",
        NextSteps: "Was Pluralsight access given on Week #3?",
        NextCodes: ["PluralSightAccessGiven"]
    },
    OpenhouseWithManagementNegative: {
        Code: "OpenhouseWithManagementNegative",
        Description: "Open house with management done on Week #2 and feedback was negative",
        NextSteps: "Discuss to rollback offer and inform the candidate",
        NextCodes: ["SentFormalLetterToBackupCandidate"]
    },
    SentFormalLetterToBackupCandidate: {
        Code: "SentFormalLetterToBackupCandidate",
        Description: "Sent formal letter to backup Candidate",
        NextSteps: "Archive the candidate",
        NextCodes: ["CandidateArchived"]
    }

}

module.exports = { CandidateStatus };