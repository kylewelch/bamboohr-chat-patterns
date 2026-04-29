import { VizKPI, VizBar, VizLine, VizDonut, VizTable } from '../patterns/viz.jsx';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import PatternShowcase from '../components/PatternShowcase.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function VizPage() {
  return (
    <>
      <PageHeader
        icon={faChartColumn}
        title="Data Viz"
        lede="Cards for surfacing numeric answers — KPI tiles, bar/line/donut charts, and small tables. Aligned to Fabric Encore tokens."
      />

      <PatternShowcase
        title="VizKPI"
        description="KPI tile with a primary stat, label, and trend indicator — for single-number answers ('What's our headcount?')."
        previewContext={{
          userMsg: "What's our current headcount?",
          aiLead: "",
        }}
      >
        <VizKPI />
      </PatternShowcase>

      <PatternShowcase
        title="VizBar"
        description="Small bar chart with axis labels for comparing a handful of categories at a glance."
        previewContext={{
          userMsg: "Compare hires per department this year.",
          aiLead: "Engineering is leading by a wide margin:",
        }}
      >
        <VizBar />
      </PatternShowcase>

      <PatternShowcase
        title="VizLine"
        description="Line/trend chart over time for showing change against a period the user asked about."
        previewContext={{
          userMsg: "How has turnover trended over the last 12 months?",
          aiLead: "Steady decline since April:",
        }}
      >
        <VizLine />
      </PatternShowcase>

      <PatternShowcase
        title="VizDonut"
        description="Donut chart with a percentage callout for part-to-whole answers ('What percent of staff is remote?')."
        previewContext={{
          userMsg: "What share of the company is remote-first?",
          aiLead: "",
        }}
      >
        <VizDonut />
      </PatternShowcase>

      <PatternShowcase
        title="VizTable"
        description="Compact table summarizing a small result set when rows-and-columns is the most honest answer shape."
        previewContext={{
          userMsg: "Show me the top five paid roles in Engineering.",
          aiLead: "Sorted by total compensation:",
        }}
      >
        <VizTable />
      </PatternShowcase>
    </>
  );
}
