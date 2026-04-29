import {
  SOEmployee,
  SOReport,
  SOJobOpening,
  SOPolicy,
  SOTraining,
  SOBenefitPlan,
  SOInlineRef,
} from '../patterns/system-objects.jsx';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import PatternShowcase from '../components/PatternShowcase.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function SystemObjectsPage() {
  return (
    <>
      <PageHeader
        icon={faBriefcase}
        title="System Objects"
        lede="Quiet, scannable references to first-class system objects: employees, reports, jobs, policies, trainings, benefit plans. One icon or avatar, one title, at most one supporting line."
      />

      <PatternShowcase
        title="SOEmployee"
        description="Employee reference card with a monogram, name, and role; the canonical way for the AI to name a specific person."
        previewContext={{
          userMsg: "Who owns the candidate review for the Backend role?",
          aiLead: "That's:",
        }}
      >
        <SOEmployee />
      </PatternShowcase>

      <PatternShowcase
        title="SOReport"
        description="Saved-report reference card with chart icon, report name, and one supporting detail (last run, owner)."
        previewContext={{
          userMsg: "Pull up the headcount report I ran last week.",
          aiLead: "Found it:",
        }}
      >
        <SOReport />
      </PatternShowcase>

      <PatternShowcase
        title="SOJobOpening"
        description="Job opening reference card showing the role and a single supporting line (department or location)."
        previewContext={{
          userMsg: "What's the most-applied-to opening right now?",
          aiLead: "By a wide margin:",
        }}
      >
        <SOJobOpening />
      </PatternShowcase>

      <PatternShowcase
        title="SOPolicy"
        description="Policy document reference card for HR/compliance references the AI quotes or links."
        previewContext={{
          userMsg: "What's the rule on carrying over unused PTO?",
          aiLead: "Pulled straight from:",
        }}
      >
        <SOPolicy />
      </PatternShowcase>

      <PatternShowcase
        title="SOTraining"
        description="Training assignment reference card for course or required-training references."
        previewContext={{
          userMsg: "What does Jordan still need to complete before Day 30?",
          aiLead: "One outstanding item:",
        }}
      >
        <SOTraining />
      </PatternShowcase>

      <PatternShowcase
        title="SOBenefitPlan"
        description="Benefit plan reference card for health, retirement, or other plan references in conversation."
        previewContext={{
          userMsg: "Which health plan are most engineers on?",
          aiLead: "67% of Engineering is enrolled in:",
        }}
      >
        <SOBenefitPlan />
      </PatternShowcase>

      <PatternShowcase
        title="SOInlineRef"
        description="A small inline chip mentioning a system object woven into running prose, when a full card would interrupt the sentence."
        previewContext={{
          userMsg: "Who managed the last comp review cycle?",
          aiLead: "",
        }}
      >
        <SOInlineRef />
      </PatternShowcase>
    </>
  );
}
