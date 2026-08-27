import type { Project, SkillCategory, Certification, ExperienceItem, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: "Prajith P",
  title: "Data Analyst | Python | SQL | Power BI | Data Visualization",
  roleHeadline: "DATA ANALYST TURNING DATA INTO DECISIONS.",
  aboutHeading: "I TURN DATA INTO BUSINESS INSIGHT.",
  summary: "Data Analyst with hands-on experience in Python, SQL, and Power BI, specializing in data cleaning, statistical analysis, and dashboard design. Skilled in ETL, predictive modeling, and business requirements gathering, translating data into actionable insights across churn, sales, and marketing analytics projects.",
  careerGoal: "Seeking a Data Analyst role to leverage analytical modeling, Power BI dashboarding, and SQL query optimization to drive data-informed business decisions.",
  email: "prajithp2k3@gmail.com",
  linkedin: "https://linkedin.com/in/prajith-datascience",
  github: "https://github.com/Prajith2K3",
  location: "Coimbatore, India",
  availabilityStatus: "OPEN TO DATA ANALYST ROLES",
  quickTags: ["Python", "SQL", "Power BI", "Data Cleaning", "Predictive Modeling", "ETL", "Machine Learning"],
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "churn-analytics",
    number: "01",
    title: "Customer Churn Analytics & Retention Strategy",
    subtitle: "End-to-end churn analytics pipeline & star schema architecture for 5,000 customer records",
    date: "Jun 2026 — Jul 2026",
    category: "Predictive Analytics & Retention",
    datasetScale: "5,000 Customer Records",
    primaryMetricValue: "0.68 ROC-AUC",
    primaryMetricLabel: "Predictive Model Accuracy",
    techStack: ["Python", "SQL", "Logistic Regression", "Power BI", "DAX", "CTEs", "Star Schema"],
    businessProblem: "Identifying high-value accounts at risk of attrition before contract expiration and measuring total revenue-at-risk across customer tiers.",
    analyticalApproach: [
      "Built an end-to-end churn analytics pipeline on 5,000 customer records using SQL and Python, applying statistical analysis and predictive modeling.",
      "Designed a dimensional data model (star schema) with 10+ SQL queries utilizing CTEs and window functions.",
      "Trained and tuned a Logistic Regression machine learning model (0.68 ROC-AUC) using Scikit-Learn.",
      "Fed a 4-page Power BI executive retention dashboard with dynamic DAX measures for interactive cohort slicing."
    ],
    sqlWork: [
      "Designed dimensional data model (star schema) optimizing queries for 5,000 customer accounts.",
      "Authored 10+ SQL queries utilizing CTEs, window functions (ROW_NUMBER, NTILE, LAG), and SQL views.",
      "Calculated customer lifetime value (CLV) and revenue-at-risk metrics dynamically across multi-table joins."
    ],
    pythonWork: [
      "Conducted exploratory data analysis (EDA) using Pandas and Seaborn to identify correlations between contract length and churn.",
      "Applied statistical cleaning: handled missing values, resolved duplicate records, and clipped extreme outliers.",
      "Trained Scikit-Learn Logistic Regression classifier, evaluating performance via ROC-AUC (0.68) and confusion matrix."
    ],
    powerBiWork: [
      "Architected a 4-page Power BI dashboard featuring executive overview, cohort analysis, predictive churn risk, and retention strategy.",
      "Implemented complex DAX measures: dynamic churn rate %, projected revenue loss, and customer risk scoring brackets.",
      "Configured interactive visual filters for contract type, payment method, and tenure buckets."
    ],
    keyMetrics: [
      { label: "Customer Dataset", value: "5,000 Records", description: "Cleaned and processed customer activity logs" },
      { label: "Model Metric", value: "0.68 ROC-AUC", description: "Logistic regression classifier performance score" },
      { label: "SQL Data Model", value: "Star Schema", description: "10+ SQL queries, CTEs & window functions" },
      { label: "Power BI Delivery", value: "4-Page Dashboard", description: "Executive retention strategy view with DAX measures" }
    ],
    businessImpact: "Built an end-to-end churn analytics pipeline providing actionable visibility into revenue-at-risk and high-risk customer cohorts.",
    recommendations: [
      "Prioritize proactive retention offers to accounts identified in the highest risk probability tier.",
      "Deploy targeted onboarding programs for accounts during initial 90-day vulnerable period.",
      "Re-evaluate annual vs monthly subscription pricing incentive structures based on cohort survival rates."
    ],
    codeSnippets: [
      {
        language: "sql",
        title: "Churn Cohort & Revenue-at-Risk CTE Query",
        code: `WITH CustomerMetrics AS (
  SELECT 
    customer_id,
    tenure_months,
    monthly_charges,
    total_charges,
    contract_type,
    SUM(monthly_charges) OVER (PARTITION BY contract_type) AS total_contract_revenue,
    NTILE(4) OVER (ORDER BY monthly_charges DESC) AS spend_quartile
  FROM customer_analytics
  WHERE account_status = 'Active'
),
RiskAssessment AS (
  SELECT *,
    CASE 
      WHEN tenure_months < 12 AND contract_type = 'Month-to-Month' THEN 'High Risk'
      WHEN tenure_months BETWEEN 12 AND 24 THEN 'Medium Risk'
      ELSE 'Low Risk'
    END AS churn_risk_tier
  FROM CustomerMetrics
)
SELECT 
  churn_risk_tier,
  COUNT(customer_id) AS total_customers,
  ROUND(SUM(monthly_charges), 2) AS monthly_revenue_at_risk,
  ROUND(AVG(tenure_months), 1) AS avg_tenure
FROM RiskAssessment
GROUP BY churn_risk_tier
ORDER BY monthly_revenue_at_risk DESC;`
      },
      {
        language: "python",
        title: "Logistic Regression Pipeline & ROC-AUC Evaluation",
        code: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score, classification_report

# Load preprocessed customer records
df = pd.read_csv('customer_churn_dataset.csv')

# Feature Selection
features = ['tenure_months', 'monthly_charges', 'support_tickets', 'contract_numeric', 'paperless_billing']
X = df[features]
y = df['churn_flag']

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

# Initialize & Train Model
model = LogisticRegression(max_iter=1000, C=1.0)
model.fit(X_train, y_train)

# Predict Probabilities & Evaluate ROC-AUC Score
y_pred_proba = model.predict_proba(X_test)[:, 1]
roc_auc = roc_auc_score(y_test, y_pred_proba)

print(f"Logistic Regression Model ROC-AUC Score: {roc_auc:.2f}")
# Output: Logistic Regression Model ROC-AUC Score: 0.68`
      }
    ],
    dashboardPagesCount: 4,
    dashboardPages: [
      "1. Executive Summary & Core KPIs",
      "2. Customer Cohort & Demographic Distribution",
      "3. Predictive Churn Risk & Revenue-at-Risk",
      "4. Actionable Retention Strategy & Scenario Planner"
    ],
    visualType: "churn-flow",
    projectImages: [
      {
        title: "Entity Relationship Diagram (Star Schema)",
        src: "/images/churn/er_diagram.png",
        caption: "Star schema dimensional model linking Customers, Subscriptions, Billing Transactions, Support Tickets, Dim Region & Dim Segment."
      },
      {
        title: "Churn Rate by Contract Type",
        src: "/images/churn/churn_by_contract_type.png",
        caption: "Month-to-Month contracts exhibit a 36.6% churn rate compared to 21.9% for One-Year and 15.1% for Two-Year contracts."
      },
      {
        title: "Churn Rate by Tenure Bucket",
        src: "/images/churn/churn_by_tenure.png",
        caption: "Highest churn occurs during initial 0-6 month tenure (42.2%), declining steadily to 20.1% for accounts with 49-72 months tenure."
      },
      {
        title: "Monthly Recurring Revenue: At Risk vs Retained",
        src: "/images/churn/mrr_at_risk_donut.png",
        caption: "27.2% of total Monthly Recurring Revenue (MRR) is identified at risk of attrition vs 72.8% retained revenue."
      },
      {
        title: "Churn Rate by Customer Segment",
        src: "/images/churn/churn_by_segment.png",
        caption: "Consumer (29.6%) and SMB (29.5%) segments exhibit higher churn rates than Enterprise accounts (24.7%)."
      },
      {
        title: "Root Cause Analysis",
        src: "/images/churn/root_cause_analysis.png",
        caption: "Root cause analysis highlighting ticket frequency, contract tier sensitivity, and pricing impact on churn."
      }
    ]
  },
  {
    id: "sales-performance",
    number: "02",
    title: "Sales Performance Executive Dashboard",
    subtitle: "$4.64M revenue, $1.68M profit & 40–60% Q4 seasonal demand trend across 6,583 sales orders",
    date: "Apr 2026 — May 2026",
    category: "Executive Revenue & Multi-Region Analytics",
    datasetScale: "6,583 Orders (2024–2026)",
    primaryMetricValue: "$4.64M Revenue",
    primaryMetricLabel: "$1.68M Profit | 36.2% Blended Margin",
    techStack: ["SQL (PostgreSQL)", "Python (pandas)", "Power BI (DAX)", "Power Query", "Window Functions", "Time Intelligence"],
    businessProblem: "Leadership had no single view of revenue, profit, and growth trends across regions, categories, and customer types (Retail vs Wholesale vs Online) — decisions were being made on gut feel rather than data.",
    analyticalApproach: [
      "Analyzed 6,583 sales order lines worth $4.64M revenue and $1.68M profit across 3 fiscal years (2024-01 to 2026-07).",
      "Engineered a normalized PostgreSQL relational schema (order_lines, products, customers) and automated synthetic dataset generator in Python.",
      "Authored 10+ SQL scripts utilizing CTEs, window functions (LAG, LEAD, SUM OVER, DENSE_RANK), views, and procedural functions for MoM and YoY tracking.",
      "Uncovered a prominent 40–60% Q4 festive season demand surge (Oct–Dec) through time-series decomposition in Python.",
      "Architected a self-serve 5-page Power BI executive dashboard with DAX time-intelligence metrics and Power Query M transformations."
    ],
    sqlWork: [
      "Designed normalized PostgreSQL database schema (01_schema.sql) linking 6,583 order_lines to 400 customers across 4 regions and 20 product SKUs.",
      "Authored analytical SQL queries (02_analysis_queries.sql) utilizing CTEs, window functions (LAG, LEAD, SUM() OVER(), DENSE_RANK()), and view definitions.",
      "Calculated MoM growth rates, YoY cumulative totals, profit margins, and top 10 revenue-generating SKUs by sales territory."
    ],
    pythonWork: [
      "Engineered synthetic data generator (generate_dataset.py) modeling multi-year seasonality, region weights, customer types, and promotional discounts.",
      "Executed exploratory data analysis (eda_analysis.py) in Pandas to quantify regional sales, category margins, and customer segment AOV.",
      "Generated statistical summary matrices for order size distribution and category profit contribution exported as Excel-compatible CSVs and JSON KPIs."
    ],
    powerBiWork: [
      "Designed an intuitive self-serve dashboard based on powerbi/dashboard_specification.md featuring DAX measures and Power Query ETL logic.",
      "Formulated advanced Time-Intelligence DAX metrics: MoM Growth %, YoY Revenue, Rolling 3-Month Average, Blended Margin %, and Customer Type AOV.",
      "Configured interactive wireframe views for Category Managers to perform ad-hoc spreadsheet-free revenue reviews."
    ],
    keyMetrics: [
      { label: "Total Sales Volume", value: "6,583 Orders", description: "Multi-region retail/distribution dataset across 3 fiscal years" },
      { label: "Total Revenue & Profit", value: "$4.64M / $1.68M", description: "36.2% blended gross profit margin ($705 AOV)" },
      { label: "Regional Leaders", value: "West ($1.294M) & North ($1.291M)", description: "West & North lead overall revenue, followed by South ($1.069M) & East ($987K)" },
      { label: "Top Revenue SKU", value: "Bluetooth Speaker (~$470K)", description: "Leads Top 10 Products by revenue followed by Backpack ($350K) & Running Shoes ($330K)" },
      { label: "Top Margin Category", value: "Apparel (38.4%)", description: "Highest category profit margin (vs Electronics 36.0%, Home & Kitchen 35.0%)" },
      { label: "Q4 Festive Peak", value: "+40% to +60%", description: "Seasonal revenue surge during Oct–Dec festive months" }
    ],
    businessImpact: "Provided executive leadership with a single-source-of-truth sales dashboard, transforming gut-feel decision-making into data-backed stocking, regional capital allocation, and category margin optimization.",
    recommendations: [
      "Inventory & Staffing Planning: Align inventory purchasing schedules and warehouse staffing 60 days prior to the Oct–Dec seasonal peak (40–60% demand surge).",
      "Apparel Category Expansion: Push the Apparel category aggressively — it achieves the highest profit margin (38.4%) with significant untapped market share.",
      "East Region Turnaround: Investigate the East region ($987K revenue, lowest among 4 regions) to evaluate pricing competitiveness, product assortment, or marketing spend.",
      "Wholesale Discount Optimization: Conduct deep AOV analysis comparing Wholesale against Retail and Online channels to right-size volume tier pricing."
    ],
    codeSnippets: [
      {
        language: "sql",
        title: "MoM & YoY Regional Sales Performance Analysis (SQL Window Functions)",
        code: `WITH MonthlySales AS (
  SELECT 
    c.region,
    DATE_TRUNC('month', ol.order_date) AS sales_month,
    SUM(ol.revenue) AS current_month_revenue,
    SUM(ol.profit) AS current_month_profit,
    COUNT(DISTINCT ol.order_id) AS total_orders
  FROM order_lines ol
  JOIN customers c ON ol.customer_id = c.customer_id
  GROUP BY c.region, DATE_TRUNC('month', ol.order_date)
),
RevenueTrends AS (
  SELECT 
    region,
    sales_month,
    current_month_revenue,
    current_month_profit,
    LAG(current_month_revenue, 1) OVER (PARTITION BY region ORDER BY sales_month) AS prev_month_revenue,
    LAG(current_month_revenue, 12) OVER (PARTITION BY region ORDER BY sales_month) AS prev_year_revenue
  FROM MonthlySales
)
SELECT 
  region,
  sales_month,
  current_month_revenue,
  current_month_profit,
  ROUND(CAST(current_month_profit / NULLIF(current_month_revenue, 0) * 100 AS numeric), 2) AS profit_margin_pct,
  ROUND(CAST(((current_month_revenue - prev_month_revenue) / NULLIF(prev_month_revenue, 0)) * 100 AS numeric), 2) AS MoM_Growth_Pct,
  ROUND(CAST(((current_month_revenue - prev_year_revenue) / NULLIF(prev_year_revenue, 0)) * 100 AS numeric), 2) AS YoY_Growth_Pct
FROM RevenueTrends
WHERE prev_month_revenue IS NOT NULL
ORDER BY sales_month DESC, current_month_revenue DESC;`
      },
      {
        language: "python",
        title: "Retail Dataset EDA & Regional/Category Margin Pipeline (Python pandas)",
        code: `import pandas as pd
import numpy as np

# Load sales transaction dataset across 3 fiscal years (2024-2026)
orders_df = pd.read_csv('data/sales_orders.csv')
customers_df = pd.read_csv('data/customers.csv')
products_df = pd.read_csv('data/products.csv')

# Merge normalized relational tables
df = orders_df.merge(customers_df, on='customer_id').merge(products_df, on='product_id')

# Executive KPI Calculations
total_revenue = df['revenue'].sum()
total_profit = df['profit'].sum()
blended_margin = (total_profit / total_revenue) * 100
total_orders = df['order_id'].nunique()
aov = total_revenue / total_orders

print("Total Revenue: $" + f"{total_revenue:,.2f} | Profit: $" + f"{total_profit:,.2f} ({blended_margin:.1f}% Margin)")
print("Total Orders: " + f"{total_orders:,} | Average Order Value (AOV): $" + f"{aov:.2f}")

# Region Revenue Breakdown
region_summary = df.groupby('region')['revenue'].sum().sort_values(ascending=False)
print("\nRegional Revenue Breakdown ($K):")
print((region_summary / 1000).round(1))

# Category Profit Margin Breakdown
category_margin = df.groupby('category').apply(
    lambda x: pd.Series({
        'Revenue': x['revenue'].sum(),
        'Profit': x['profit'].sum(),
        'Margin_Pct': (x['profit'].sum() / x['revenue'].sum()) * 100
    })
).sort_values('Margin_Pct', ascending=False)
print("\nCategory Margin Performance:")
print(category_margin)`
      },
      {
        language: "dax",
        title: "Power BI Time-Intelligence DAX Revenue & Margin Measures",
        code: `// Executive Sales Measures
Total Revenue = SUM(order_lines[revenue])

Total Profit = SUM(order_lines[profit])

Blended Margin % = DIVIDE([Total Profit], [Total Revenue], 0)

Average Order Value (AOV) = DIVIDE([Total Revenue], DISTINCTCOUNT(order_lines[order_id]), 0)

// Month-over-Month Revenue Growth %
Revenue MoM Growth % = 
VAR CurrentMonthRevenue = [Total Revenue]
VAR PriorMonthRevenue = CALCULATE(
    [Total Revenue], 
    DATEADD('Calendar'[Date], -1, MONTH)
)
RETURN
IF(
    ISBLANK(PriorMonthRevenue),
    BLANK(),
    DIVIDE(CurrentMonthRevenue - PriorMonthRevenue, PriorMonthRevenue, 0)
)

// Year-over-Year Revenue Growth %
Revenue YoY Growth % = 
VAR CurrentRevenue = [Total Revenue]
VAR PriorYearRevenue = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('Calendar'[Date]))
RETURN
DIVIDE(CurrentRevenue - PriorYearRevenue, PriorYearRevenue, 0)`
      }
    ],
    dashboardPagesCount: 5,
    dashboardPages: [
      "1. Executive Revenue & Profit Margin Summary",
      "2. Regional Performance & Sales Territory Matrix",
      "3. Category Profitability & SKU Margin Breakdown",
      "4. Seasonal Demand & MoM/YoY Trend Decomposition",
      "5. Customer Segment Behavior & Order Value Analytics"
    ],
    visualType: "sales-landscape",
    projectImages: [
      {
        title: "Power BI Executive Dashboard Interface",
        src: "/images/sales/dashboard_overview.png",
        caption: "Full Power BI executive dashboard displaying $4.64M Revenue, $1.68M Profit (36.2% margin), 6,583 Orders ($705 AOV), Top 10 SKUs, Regional Breakdown, Category Margins, and Q4 Seasonality."
      },
      {
        title: "Entity Relationship Diagram (ER Diagram)",
        src: "/images/sales/er_diagram.png",
        caption: "Normalized relational schema linking order_lines (fact table) to customers and products (dimension tables)."
      },
      {
        title: "Total Revenue by Region",
        src: "/images/sales/revenue_by_region.png",
        caption: "West ($1,294K) and North ($1,291K) lead overall regional revenue, followed by South ($1,069K) and East ($987K)."
      },
      {
        title: "Profit Margin by Product Category",
        src: "/images/sales/margin_by_category.png",
        caption: "Apparel achieves the highest profit margin (38.4%), outperforming Electronics (36.0%), Home & Kitchen (35.0%), and Office Supplies (34.9%)."
      },
      {
        title: "Seasonality: Avg Daily Revenue by Month",
        src: "/images/sales/seasonality.png",
        caption: "Q4 Festive Season (Oct–Dec) runs 40–60% above baseline demand, peaking in September through December."
      },
      {
        title: "Monthly Revenue Trend (2024–2026)",
        src: "/images/sales/monthly_revenue_trend.png",
        caption: "Multi-year monthly revenue trajectory from Jan 2024 to Jul 2026 showing steady ~12% YoY baseline growth with Q4 seasonal peaks."
      }
    ]
  },
  {
    id: "marketing-roi",
    number: "03",
    title: "Marketing Campaign Performance & ROI Analytics",
    subtitle: "$860K budget audit across 40 campaigns & 5 channels yielding 7.06x blended ROAS",
    date: "Feb 2026 — Mar 2026",
    category: "Marketing Analytics & Channel Efficiency",
    datasetScale: "$860K Marketing Spend",
    primaryMetricValue: "7.06x ROAS",
    primaryMetricLabel: "Blended Return on Ad Spend",
    techStack: ["SQL", "Python", "Power BI", "DAX", "CTEs", "NTILE Quartiles"],
    businessProblem: "Evaluating ad spend efficiency across 40 campaigns and 5 marketing channels to eliminate wasteful spend and optimize cost-per-acquisition (CPA).",
    analyticalApproach: [
      "Evaluated $860K in marketing spend across 40 campaigns and 5 channels using SQL and Python.",
      "Achieved a blended ROAS of 7.06x across campaign tiers.",
      "Designed a 5-page Power BI dashboard with custom ROAS/CPA DAX measures.",
      "Recommended a data-backed budget reallocation strategy to optimize ad spend across channels."
    ],
    sqlWork: [
      "Applied NTILE(4) quartile ranking to segment 40 campaigns by ROAS performance into top, mid, and low tiers.",
      "Identified underperforming campaigns operating below acceptable CPA thresholds using multi-condition CTE queries.",
      "Aggregated multi-channel conversion funnels and spend attribution across digital channels."
    ],
    pythonWork: [
      "Merged multi-platform marketing logs in Pandas, standardizing campaign IDs, spend figures, and conversion metrics.",
      "Executed correlation analysis between campaign duration, ad creative types, and ROAS performance.",
      "Generated automated data validation scripts to flag anomalous cost spikes and missing click-through records."
    ],
    powerBiWork: [
      "Built a 5-page interactive dashboard tailored for CMO and performance marketing stakeholders.",
      "Developed custom DAX measures for Blended ROAS, Channel CPA, Incremental Conversion Value, and Target vs Actual Spend.",
      "Created campaign tier ranking matrix allowing instant breakdown of budget distribution vs return."
    ],
    keyMetrics: [
      { label: "Marketing Budget Audited", value: "$860K", description: "Aggregated spend across 40 campaigns" },
      { label: "Campaigns & Channels", value: "40 Campaigns / 5 Channels", description: "Multi-channel marketing dataset" },
      { label: "Blended ROAS", value: "7.06x", description: "Overall return on ad spend achieved" },
      { label: "Dashboard Solution", value: "5-Page Power BI", description: "ROAS/CPA executive suite with reallocation framework" }
    ],
    businessImpact: "Evaluated $860K marketing spend across 40 campaigns, establishing a 7.06x blended ROAS and a data-backed budget reallocation strategy.",
    recommendations: [
      "Reallocate capital from underperforming campaigns to top-performing channel tiers.",
      "Set maximum CPA threshold caps per channel to trigger automated campaign pauses before budget burn occurs.",
      "Increase ad spend allocation to channels demonstrating >8.5x ROAS during prime conversion hours."
    ],
    codeSnippets: [
      {
        language: "sql",
        title: "Campaign NTILE Quartile Segmentation & ROAS Ranking",
        code: `WITH CampaignMetrics AS (
  SELECT 
    campaign_id,
    campaign_name,
    channel,
    spend_amount,
    revenue_generated,
    conversions,
    ROUND(revenue_generated / spend_amount, 2) AS roas,
    ROUND(spend_amount / NULLIF(conversions, 0), 2) AS cpa
  FROM marketing_campaigns
  WHERE spend_amount > 0
),
QuartileSegmentation AS (
  SELECT *,
    NTILE(4) OVER (ORDER BY roas DESC) AS performance_quartile
  FROM CampaignMetrics
)
SELECT 
  performance_quartile,
  COUNT(campaign_id) AS total_campaigns,
  SUM(spend_amount) AS total_spend,
  SUM(revenue_generated) AS total_revenue,
  ROUND(SUM(revenue_generated) / SUM(spend_amount), 2) AS blended_roas,
  ROUND(AVG(cpa), 2) AS avg_cpa
FROM QuartileSegmentation
GROUP BY performance_quartile
ORDER BY performance_quartile ASC;`
      },
      {
        language: "python",
        title: "Channel Spend & Conversion Efficiency Analysis (Pandas)",
        code: `import pandas as pd

# Read marketing spend and conversion dataset
df = pd.read_csv('marketing_campaign_data.csv')

# Calculate ROAS and CPA
df['ROAS'] = df['revenue_generated'] / df['spend_amount']
df['CPA'] = df['spend_amount'] / df['conversions']

# Group by Channel
channel_summary = df.groupby('channel').agg(
    total_spend=('spend_amount', 'sum'),
    total_revenue=('revenue_generated', 'sum'),
    total_conversions=('conversions', 'sum'),
    campaign_count=('campaign_id', 'count')
).reset_index()

channel_summary['Blended_ROAS'] = (channel_summary['total_revenue'] / channel_summary['total_spend']).round(2)
channel_summary['Avg_CPA'] = (channel_summary['total_spend'] / channel_summary['total_conversions']).round(2)

# Identify Underperforming Campaigns (ROAS < 3.0x or CPA > Target)
underperforming = df[(df['ROAS'] < 3.0) | (df['CPA'] > 85.0)]
print(f"Total Budget Audited: \${df['spend_amount'].sum():,.2f}")
print(f"Blended ROAS: {df['revenue_generated'].sum() / df['spend_amount'].sum():.2f}x")
print(f"Underperforming Campaigns Flagged: {len(underperforming)}")`
      }
    ],
    dashboardPagesCount: 5,
    dashboardPages: [
      "1. Executive Marketing ROI & ROAS Overview",
      "2. Channel Efficiency & Spend Attribution",
      "3. Campaign NTILE Performance Quartile Matrix",
      "4. CPA & Conversion Funnel Deep-Dive",
      "5. Data-Backed Budget Reallocation Simulator"
    ],
    visualType: "marketing-funnel",
    projectImages: [
      {
        title: "Entity Relationship Diagram",
        src: "/images/marketing/er_diagram.png",
        caption: "Data schema connecting campaigns table to daily performance logs tracking spend, impressions, clicks, conversions & revenue."
      },
      {
        title: "ROAS by Channel (Break-Even = 1.0x)",
        src: "/images/marketing/roas_by_channel.png",
        caption: "Email dominates return efficiency at 22.8x ROAS, followed by Paid Search (1.3x) and Affiliate (1.1x), while Display operates below break-even at 0.8x."
      },
      {
        title: "CPA by Channel",
        src: "/images/marketing/cpa_by_channel.png",
        caption: "Cost Per Acquisition ranges from ultra-efficient $3 for Email to $64 for Social Media, $66 for Paid Search/Affiliate, and $74 for Display."
      },
      {
        title: "Monthly Spend vs Revenue Trend",
        src: "/images/marketing/monthly_spend_vs_revenue.png",
        caption: "Time-series decomposition of monthly campaign spend vs generated revenue, showcasing promotional revenue surges."
      },
      {
        title: "Campaign-Level Spend vs Revenue Scatter",
        src: "/images/marketing/spend_vs_revenue_scatter.png",
        caption: "Scatter plot of individual campaign spend vs revenue relative to the ROAS=1.0 break-even threshold across 5 digital channels."
      },
      {
        title: "Underperforming Campaigns by Channel",
        src: "/images/marketing/underperforming_by_channel.png",
        caption: "Breakdown of underperforming campaigns flagged for budget reallocation across channels."
      }
    ]
  },
  {
    id: "patient-survival",
    number: "04",
    title: "Patient Survival Prediction & Clinical Risk Analytics",
    subtitle: "3-layer Keras neural network & SHAP explainability predicting ICU in-hospital mortality on 8,000 patient records",
    date: "Aug 2026",
    category: "Healthcare Deep Learning & Clinical Analytics",
    datasetScale: "8,000 Patient Records (22 Features)",
    primaryMetricValue: "0.925 ROC-AUC",
    primaryMetricLabel: "Neural Network Discrimination",
    techStack: ["Python", "TensorFlow / Keras", "Scikit-Learn", "SHAP", "Mutual Information", "Streamlit"],
    businessProblem: "Predicting in-hospital mortality risk (hospital_death) for intensive care unit (ICU) patients upon admission using high-dimensional physiological vitals, APACHE scores, and lab values.",
    analyticalApproach: [
      "Preprocessed 8,000 patient records using median imputation for missing laboratory values.",
      "Calculated mutual information scores across all 22 physiological and clinical features using mutual_info_classif.",
      "Applied SelectKBest(k=12) to extract top predictive features (APACHE death probabilities, GCS components, vitals, labs, comorbidities).",
      "Engineered and trained a 3-layer Dense Neural Network (Dense 12->8->1, Adam lr=0.02, 20 epochs, batch size 10).",
      "Evaluated model discrimination achieving 87.6% accuracy, 75.5% precision, 67.1% recall, and 0.925 ROC-AUC.",
      "Integrated SHAP KernelExplainer summary interpretations to explain individual feature impacts on mortality predictions."
    ],
    sqlWork: [
      "Extracted and structured 22 physiological features across ICU admission, APACHE scoring, lab results, and patient outcome tables.",
      "Calculated baseline clinical severity metrics and cohort mortality rates."
    ],
    pythonWork: [
      "Performed feature selection using Scikit-Learn mutual_info_classif and SelectKBest(k=12).",
      "Built and trained Keras Sequential Deep Neural Network with Adam optimizer (lr=0.02) and binary cross-entropy loss.",
      "Computed SHAP KernelExplainer values to generate feature impact summary plots."
    ],
    powerBiWork: [
      "Sketched interactive Streamlit clinical risk scoring dashboard displaying real-time patient risk probabilities.",
      "Visualized confusion matrix, ROC curve (AUC=0.925), and epoch training curves for clinical reviewers."
    ],
    keyMetrics: [
      { label: "Model Accuracy", value: "87.6%", description: "Test set classification accuracy on ICU patient cohort" },
      { label: "ROC-AUC Score", value: "0.925", description: "Discriminative performance evaluating true vs false positive rates" },
      { label: "Selected Features", value: "Top 12 Features", description: "Mutual information feature selection (SelectKBest)" },
      { label: "Deep Learning Stack", value: "Dense (12→8→1)", description: "3-layer neural network trained via Adam (lr=0.02)" }
    ],
    businessImpact: "Delivered an end-to-end deep learning clinical risk analytics prototype with SHAP explainability, achieving 87.6% accuracy and 0.925 ROC-AUC for ICU mortality risk stratification.",
    recommendations: [
      "Validate model performance against external GOSSIS multi-center ICU datasets before clinical piloting.",
      "Incorporate real-time SHAP feature attribution explanations into clinical decision support (CDS) interfaces.",
      "Establish automated monitoring pipelines for clinical data drift and subgroup bias auditing."
    ],
    codeSnippets: [
      {
        language: "python",
        title: "TensorFlow/Keras Neural Network Architecture & Training Script",
        code: `import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam
from sklearn.feature_selection import SelectKBest, mutual_info_classif
from sklearn.preprocessing import StandardScaler
import shap

# 1. Feature Selection (Top 12 Features via Mutual Information)
selector = SelectKBest(score_func=mutual_info_classif, k=12)
X_selected = selector.fit_transform(X_train, y_train)
X_test_selected = selector.transform(X_test)

# 2. Feature Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_selected)
X_test_scaled = scaler.transform(X_test_selected)

# 3. Neural Network Architecture: Dense(12, relu) -> Dense(8, relu) -> Dense(1, sigmoid)
model = Sequential([
    Dense(12, activation='relu', input_shape=(12,)),
    Dense(8, activation='relu'),
    Dense(1, activation='sigmoid')
])

# 4. Compile & Train
optimizer = Adam(learning_rate=0.02)
model.compile(optimizer=optimizer, loss='binary_crossentropy', metrics=['accuracy'])

history = model.fit(
    X_train_scaled, y_train,
    epochs=20,
    batch_size=10,
    validation_split=0.2,
    verbose=1
)

# 5. SHAP Explainability
explainer = shap.KernelExplainer(model.predict, X_train_scaled[:100])
shap_values = explainer.shap_values(X_test_scaled[:100])
shap.summary_plot(shap_values, X_test_scaled[:100])`
      }
    ],
    dashboardPagesCount: 4,
    dashboardPages: [
      "1. Clinical Patient Demographics & Outcome Distribution",
      "2. Mutual Information Feature Importance & Selection",
      "3. Neural Network Training Curves & Discrimination (ROC-AUC)",
      "4. SHAP Feature Impact & Interactive Risk Scoring"
    ],
    visualType: "churn-flow",
    projectImages: [
      {
        title: "Mutual Information Feature Selection",
        src: "/images/patient_survival/03_feature_selection_mi_scores.png",
        caption: "Mutual information scores ranking top 12 predictive features led by APACHE death probabilities, GCS scores, and vital signs."
      },
      {
        title: "Neural Network Training Curves",
        src: "/images/patient_survival/04_training_curves.png",
        caption: "Accuracy and loss trajectories across 20 training epochs demonstrating smooth convergence without overfitting."
      },
      {
        title: "Confusion Matrix — Test Set",
        src: "/images/patient_survival/05_confusion_matrix.png",
        caption: "Test set confusion matrix evaluating 1,600 ICU patients (1163 True Negatives, 245 True Positives)."
      },
      {
        title: "ROC Curve — Neural Network",
        src: "/images/patient_survival/06_roc_curve.png",
        caption: "Receiver Operating Characteristic (ROC) curve yielding an outstanding 0.925 ROC-AUC score."
      },
      {
        title: "SHAP Explainability Summary Plot",
        src: "/images/patient_survival/07_shap_summary.png",
        caption: "SHAP KernelExplainer summary plot interpreting feature impact on individual mortality risk predictions."
      }
    ]
  },
  {
    id: "crop-recommendation",
    number: "05",
    title: "Crop Recommendation System & Agronomic Analytics",
    subtitle: "Multi-class machine learning benchmark recommending optimal crops from soil nutrients (N-P-K), pH, and climate metrics",
    date: "Aug 2026",
    category: "AgriTech ML & Multi-Class Classification",
    datasetScale: "1,760 Records (8 Crop Classes)",
    primaryMetricValue: "97.4% Accuracy",
    primaryMetricLabel: "Best Model (Logistic Regression)",
    techStack: ["Python", "Scikit-Learn", "Pandas", "Logistic Regression", "Random Forest", "SVM (RBF)", "KNN", "Seaborn"],
    businessProblem: "Recommending optimal crops (rice, maize, wheat, coffee, cotton, banana, chickpea, watermelon) for agricultural plots based on soil nutrient levels (N, P, K), pH, temperature, humidity, and rainfall to optimize yield and mitigate crop failure risk.",
    analyticalApproach: [
      "Preprocessed 1,760 soil/weather records across 8 balanced crop classes with median imputation for sensor missingness.",
      "Conducted exploratory data analysis evaluating feature correlations, N-P-K nutrient variance, and rainfall/temperature boxplots.",
      "Benchmarked 5 classification algorithms (Logistic Regression, SVM RBF, Random Forest, K-Nearest Neighbors, Decision Tree).",
      "Validated performance using 5-fold cross-validation, achieving peak 97.4% test accuracy with Logistic Regression and SVM RBF.",
      "Analyzed Random Forest feature importances, confirming rainfall and humidity as the strongest crop-differentiating signals.",
      "Developed a production-ready recommend_crop() inference engine delivering ranked crop suggestions with probability confidence scores."
    ],
    sqlWork: [
      "Queried and transformed multi-sensor soil laboratory tables (Nitrogen, Phosphorus, Potassium, pH) and daily weather station logs.",
      "Aggregated crop yield history and cohort soil nutrient distributions across 8 major agricultural crop varieties."
    ],
    pythonWork: [
      "Implemented scikit-learn pipeline comparing Logistic Regression, SVM (RBF kernel), Random Forest, KNN, and Decision Trees.",
      "Performed 5-fold cross-validation and confusion matrix evaluation across all 8 multi-class crop targets.",
      "Built real-time inference function recommend_crop() returning ranked probabilities for crop selection."
    ],
    powerBiWork: [
      "Designed agronomic decision dashboard visualizing crop distribution, feature correlation heatmaps, and soil nutrient boxplots.",
      "Built model comparison matrix displaying Test Accuracy vs CV Mean Accuracy across 5 algorithms."
    ],
    keyMetrics: [
      { label: "Best Test Accuracy", value: "97.4%", description: "Achieved by Logistic Regression & SVM (RBF)" },
      { label: "CV Mean Accuracy", value: "97.4%", description: "5-fold cross-validation mean accuracy score" },
      { label: "Crop Candidates", value: "8 Crop Types", description: "Multi-class target (rice, maize, wheat, coffee, cotton, banana, chickpea, watermelon)" },
      { label: "Agronomic Features", value: "7 Soil & Climate Features", description: "N, P, K, pH, temperature, humidity, rainfall" }
    ],
    businessImpact: "Delivered a high-precision 97.4% multi-class agronomic recommendation model empowering farmers and agricultural advisors with data-driven crop selection to maximize crop yield and optimize land productivity.",
    recommendations: [
      "Integrate real-time IoT soil sensor feeds (N-P-K probes) and automated local weather API streams into the recommendation pipeline.",
      "Expand target crop classes beyond 8 candidates to include regional cash crops and fruits.",
      "Incorporate historical yield data and market commodity pricing to provide joint agronomic-economic crop selection advice."
    ],
    codeSnippets: [
      {
        language: "python",
        title: "Scikit-Learn Multi-Model Classification & Crop Recommendation Engine",
        code: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

# 1. Load & Preprocess Agronomic Soil/Weather Dataset
df = pd.read_csv('crop_recommendation_dataset.csv')
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['crop']

# 2. Train / Test Split & Feature Scaling
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 3. Model Benchmark across 5 Algorithms
models = {
    'Logistic Regression': LogisticRegression(max_iter=1000),
    'SVM (RBF)': SVC(probability=True),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'KNN': KNeighborsClassifier(n_neighbors=5),
    'Decision Tree': DecisionTreeClassifier(random_state=42)
}

results = []
for name, model in models.items():
    model.fit(X_train_scaled, y_train)
    test_acc = model.score(X_test_scaled, y_test)
    cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5)
    results.append({
        'Model': name,
        'Test Accuracy': f"{test_acc * 100:.1f}%",
        'CV Mean Accuracy': f"{cv_scores.mean() * 100:.1f}%"
    })

# 4. Crop Recommendation Function with Confidence Scores
best_model = models['Logistic Regression']

def recommend_crop(n, p, k, temp, humidity, ph, rainfall):
    sample = scaler.transform([[n, p, k, temp, humidity, ph, rainfall]])
    probs = best_model.predict_proba(sample)[0]
    classes = best_model.classes_
    ranked = sorted(zip(classes, probs), key=lambda x: x[1], reverse=True)
    return [{"crop": c, "confidence": f"{p*100:.1f}%"} for c, p in ranked[:3]]

# Sample Input (Rice-like soil/weather)
print(recommend_crop(n=90, p=42, k=43, temp=24.5, humidity=82.0, ph=6.2, rainfall=235.0))`
      }
    ],
    dashboardPagesCount: 5,
    dashboardPages: [
      "1. Soil Nutrient & Climate Parameter Overview",
      "2. Crop Class Distribution & Agronomic Baselines",
      "3. Feature Correlation & N-P-K Nutrient Heatmap",
      "4. Algorithm Performance Comparison & 5-Fold Cross-Validation",
      "5. Ranked Crop Recommendation & Confidence Scoring Interface"
    ],
    visualType: "churn-flow",
    projectImages: [
      {
        title: "Crop Class Distribution",
        src: "/images/crop_recommendation/01_crop_distribution.png",
        caption: "Balanced class distribution showcasing 220 samples for each of the 8 candidate crop varieties (1,760 total records)."
      },
      {
        title: "Feature Correlation Heatmap",
        src: "/images/crop_recommendation/02_correlation_heatmap.png",
        caption: "Correlation matrix analyzing interactions between soil nutrients (N, P, K), pH, temperature, humidity, and rainfall."
      },
      {
        title: "EDA Boxplots by Crop",
        src: "/images/crop_recommendation/03_eda_boxplots.png",
        caption: "Agronomic boxplot decomposition revealing distinct per-crop profiles across rainfall, temperature, soil pH, and potassium (K)."
      },
      {
        title: "Algorithm Performance Comparison",
        src: "/images/crop_recommendation/04_model_comparison.png",
        caption: "Benchmarking 5 classification models across Test Accuracy and 5-Fold CV Mean Accuracy, led by Logistic Regression (97.4%)."
      },
      {
        title: "Confusion Matrix — Logistic Regression",
        src: "/images/crop_recommendation/05_confusion_matrix.png",
        caption: "Multiclass confusion matrix evaluating classification precision across all 8 target crop varieties."
      }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "data-languages",
    title: "Languages & Databases",
    subtitle: "Core query, scripting & database architecture foundation",
    items: [
      { name: "Python", level: "Advanced", description: "Pandas, NumPy, Data Cleaning, Scripting", isPrimary: true },
      { name: "SQL", level: "Advanced", description: "CTEs, Window Functions, Views, Joins", isPrimary: true },
      { name: "MySQL", level: "Proficient", description: "Relational Schema Design, Queries", isPrimary: true }
    ]
  },
  {
    id: "analytics-libraries",
    title: "Analytics Libraries",
    subtitle: "Statistical computing, data manipulation & predictive modeling",
    items: [
      { name: "Pandas", level: "Advanced", description: "Data Wrangling, Aggregation, Time-Series", isPrimary: true },
      { name: "NumPy", level: "Advanced", description: "Numerical Arrays, Vectorized Math", isPrimary: true },
      { name: "Scikit-Learn", level: "Proficient", description: "Logistic Regression, ROC-AUC, Pipeline", isPrimary: true },
      { name: "Matplotlib", level: "Proficient", description: "Exploratory Plots, Data Visualizations" }
    ]
  },
  {
    id: "bi-visualization",
    title: "BI & Visualization",
    subtitle: "Interactive executive reporting, DAX measures & data modeling",
    items: [
      { name: "Power BI", level: "Advanced", description: "DAX, Power Query, Interactive Dashboards", isPrimary: true },
      { name: "Tableau", level: "Proficient", description: "Visual Analytics, Executive Dashboards" },
      { name: "Excel", level: "Advanced", description: "Advanced Formulas, Pivot Tables, Analysis" },
      { name: "Data Storytelling", level: "Advanced", description: "Translating Data into Strategic Insights" }
    ]
  },
  {
    id: "core-competencies",
    title: "Core Competencies",
    subtitle: "Analytical methods, data pipeline execution & business communication",
    items: [
      { name: "Data Cleaning", level: "Expert", description: "Handling Outliers, Duplicates, Imputation", isPrimary: true },
      { name: "Data Quality Management", level: "Advanced", description: "Ensuring Integrity & Accuracy", isPrimary: true },
      { name: "ETL", level: "Advanced", description: "Extract, Transform, Load Pipelines", isPrimary: true },
      { name: "Statistical Analysis", level: "Advanced", description: "Trend Analysis, Distributions", isPrimary: true },
      { name: "Predictive Modeling", level: "Proficient", description: "Churn Modeling, Classification", isPrimary: true },
      { name: "Machine Learning", level: "Proficient", description: "Supervised Learning, Model Evaluation" },
      { name: "Dimensional Data Modeling", level: "Advanced", description: "Star Schema Architecture, Fact & Dim Tables" },
      { name: "Project Management", level: "Proficient", description: "End-to-End Analytical Deliverables" }
    ]
  },
  {
    id: "platforms",
    title: "Platforms & Tools",
    subtitle: "Development environments & technical workflow tools",
    items: [
      { name: "Git / GitHub", level: "Daily Use", description: "Version Control & Code Repositories", isPrimary: true },
      { name: "Visual Studio Code", level: "Daily Use", description: "Primary IDE & Scripting" },
      { name: "Jupyter Notebook", level: "Daily Use", description: "Exploratory Analysis & Prototyping" },
      { name: "PyCharm", level: "Proficient", description: "Python Development Environment" },
      { name: "IntelliJ IDEA", level: "Proficient", description: "IDE Platform" }
    ]
  }
];

export const SKILLS_DATA = SKILL_CATEGORIES;

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: "letsgrowmore-intern",
    role: "Data Analyst Intern",
    company: "LetsGrowMore",
    location: "Remote",
    duration: "Dec 2025 — May 2026",
    credentialId: "LGMVIPDS0002175",
    welcomeId: "LGMVIPDSWL0005924",
    accreditation: "MSME (Ministry of Micro, Small & Medium Enterprises, Govt. of India)",
    issuedDate: "June 6, 2026",
    certificateImg: "/images/certificates/letsgrowmore_completion_certificate.png",
    welcomeLetterImg: "/images/certificates/letsgrowmore_welcome_letter.png",
    responsibilities: [
      "Analyzed business datasets using Python and SQL over a 6-month internship to uncover trends and support data-driven decision-making.",
      "Built interactive Power BI dashboards and reports to improve stakeholder visibility into key performance metrics.",
      "Conducted business requirements gathering with mentors, translating objectives into analytical deliverables.",
      "Earned official MSME-accredited Internship Completion Certificate (CID: LGMVIPDS0002175) and Selection Welcome Letter (CID: LGMVIPDSWL0005924)."
    ],
    etlStages: [
      { stage: "DATA", title: "Ingestion & Discovery", description: "Extracted business datasets across relational databases and flat files." },
      { stage: "CLEAN", title: "Preprocessing & Quality", description: "Handled missing values, resolved duplicate records, and processed outliers in Python & SQL." },
      { stage: "ANALYZE", title: "Statistical Analysis", description: "Uncovered operational trends and statistical patterns over a 6-month internship." },
      { stage: "VISUALIZE", title: "Dashboard Engineering", description: "Built interactive Power BI dashboards and reports to boost executive visibility." },
      { stage: "INSIGHT", title: "Requirements Gathering", description: "Translated mentor and stakeholder objectives into actionable analytical deliverables." }
    ]
  },
  {
    id: "spice-coconut-venture",
    role: "Co-Founder (Self-Employed)",
    company: "Spice & Coconut Oil Micro-Business",
    location: "Malappuram, Kerala",
    duration: "Aug 2024 — Apr 2025",
    ventureImages: [
      {
        title: "Cold-Pressed Coconut Oil Workshop",
        src: "/images/ventures/cold_pressed_coconut_oil.png",
        caption: "Traditional cold-processed virgin coconut oil bottled in Malappuram, Kerala (250ml, 500ml, 1L bottles) next to fresh coconuts and dried copra."
      },
      {
        title: "Organic Spice Powder Packaging",
        src: "/images/ventures/spice_packaging_production.png",
        caption: "Hand-packaged red chili powder, turmeric, and coriander in eco-friendly consumer pouches (250g, 500g) with raw spice ingredients."
      }
    ],
    responsibilities: [
      "Co-founded a small-scale food production venture, sourcing raw chili, turmeric, and coriander from wholesale markets and processing them into packaged spice powders (250g/500g/1kg) for local retail distribution.",
      "Produced seasonal coconut oil via traditional cold-processing (drying, milling, bottling in 250ml/500ml/1L), managing sourcing, quality control, and distribution to village retail stores for 9 months before winding down following a change in business partnership."
    ],
    etlStages: [
      { stage: "DATA", title: "Raw Material Sourcing", description: "Procured raw chili, turmeric, coriander, and coconuts from wholesale markets." },
      { stage: "CLEAN", title: "Quality Control", description: "Managed cold-processing, drying, milling, and rigorous batch quality assurance." },
      { stage: "ANALYZE", title: "Supply Chain & Packaging", description: "Optimized unit sizing (250g/500g/1kg powders, 250ml/500ml/1L oil bottles) for local retail." },
      { stage: "VISUALIZE", title: "Sales & Distribution", description: "Distributed packaged products across village retail store networks for 9 months." },
      { stage: "INSIGHT", title: "Venture Operations", description: "Managed financial oversight, inventory control, and strategic partner negotiations." }
    ]
  }
];

export const EDUCATION_DATA: EducationItem = {
  degree: "B.Sc. in Data Science and Analytics",
  institution: "Sree Saraswathi Thyagaraja College",
  duration: "Oct 2021 — May 2024",
  location: "Coimbatore, India"
};

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "openai-agents",
    title: "Agents and Workflows",
    issuer: "OpenAI Academy",
    date: "August 5th, 2026",
    image: "/images/certificates/openai_agents_and_workflows.png",
    verificationCode: "Certificate ID: wrjyzsumc7",
    skills: ["AI Agents", "Agentic Workflows", "Tool Calling", "Multi-Agent Orchestration", "LLM Pipelines"],
    description: "Mastered autonomous AI agent design, multi-agent orchestration, stateful workflow management, and tool integration using OpenAI models and APIs.",
    featured: true
  },
  {
    id: "openai-applied-ai",
    title: "Applied AI Foundations",
    issuer: "OpenAI Academy",
    date: "August 5th, 2026",
    image: "/images/certificates/openai_applied_ai_foundations.png",
    verificationCode: "Certificate ID: 0295s26qvi",
    skills: ["Applied AI", "LLM Applications", "Prompt Engineering", "RAG Systems", "AI Product Integration"],
    description: "Practical mastery of building real-world AI applications, prompt engineering techniques, Retrieval-Augmented Generation (RAG), and deploying intelligent LLM tools.",
    featured: true
  },
  {
    id: "openai-ai-foundations",
    title: "AI Foundations",
    issuer: "OpenAI Academy",
    date: "August 5th, 2026",
    image: "/images/certificates/openai_ai_foundations.png",
    verificationCode: "Certificate ID: u6pqdirwih",
    skills: ["Generative AI Core", "Transformer Architectures", "Neural Networks", "Model Evaluation"],
    description: "Foundational understanding of deep learning mechanisms, transformer architectures, generative AI paradigms, and model performance evaluation.",
    featured: true
  },
  {
    id: "anthropic-ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic (UCC / Ringling / HEA Accredited)",
    date: "August 2026",
    image: "/images/certificates/anthropic_ai_fluency.png",
    verificationCode: "Accredited by Anthropic & Partner Academic Authorities",
    skills: ["AI Frameworks", "LLM Capabilities", "Ethical AI Alignment", "Prompt Architecture", "AI Strategy"],
    description: "Completed comprehensive curriculum on AI frameworks, foundational model mechanics, alignment principles, and strategic AI implementation.",
    featured: true
  },
  {
    id: "bcg-ds",
    title: "Data Science Job Simulation",
    issuer: "BCG X (Forage)",
    date: "August 8th, 2026",
    image: "/images/certificates/bcg_x_data_science.png",
    verificationCode: "Verification Code: 6a771b21beeabacfe35b83d2 / 6a770756350ada73edd6a77e",
    skills: ["Data Science", "EDA & Cleaning", "Feature Engineering", "Predictive Modeling", "Insights & Recommendations"],
    description: "Completed practical tasks framing business problems, executing exploratory data analysis and data cleaning, feature engineering, modeling & evaluation, and delivering data-driven business recommendations.",
    featured: true
  },
  {
    id: "deloitte-da",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (Forage)",
    date: "August 8th, 2026",
    image: "/images/certificates/deloitte_data_analytics.png",
    verificationCode: "Verification Code: 6a77087dfb673cc13ddf2bd8 / 6a770756350ada73edd6a77e",
    skills: ["Data Analytics", "Forensic Technology", "Business Data Auditing", "Problem Solving"],
    description: "Completed practical tasks in corporate data analysis, forensic technology investigation, and analytical problem-solving for enterprise clients.",
    featured: true
  },
  {
    id: "oracle-db",
    title: "Databases for Developers: Foundations",
    issuer: "Oracle Corporation (Oracle Dev Gym)",
    date: "August 2026",
    score: "98% Grade of Excellence",
    image: "/images/certificates/oracle_databases_foundations.png",
    verificationCode: "Taught by Chris Saxon | Presented by Oracle Corporation",
    skills: ["Relational Databases", "SQL Querying", "Database Architecture", "Schema Modeling", "Data Manipulation"],
    description: "Earned Certificate of Excellence with a 98% grade, mastering relational database principles, complex SQL queries, table joins, and schema modeling.",
    featured: true
  },
  {
    id: "microsoft-power-bi-suite",
    title: "Microsoft Power BI Certification Suite",
    issuer: "Microsoft Corporation (Microsoft Learn)",
    date: "July 26, 2026",
    image: "/images/certificates/powerbi/microsoft_prepare_visualize_power_bi.png",
    suiteImages: [
      { title: "1. Prepare and Visualize Data with Microsoft Power BI (Master Trophy)", src: "/images/certificates/powerbi/microsoft_prepare_visualize_power_bi.png" },
      { title: "2. Model Data with Power BI", src: "/images/certificates/powerbi/microsoft_model_data_power_bi.png" },
      { title: "3. Prepare Data for Analysis with Power BI", src: "/images/certificates/powerbi/microsoft_prepare_data_power_bi.png" },
      { title: "4. Design Effective Reports in Power BI", src: "/images/certificates/powerbi/microsoft_design_effective_reports_power_bi.png" },
      { title: "5. Manage and Secure Power BI", src: "/images/certificates/powerbi/microsoft_manage_secure_power_bi.png" },
      { title: "6. Get Started with Microsoft Data Analytics", src: "/images/certificates/powerbi/microsoft_get_started_data_analytics.png" }
    ],
    verificationCode: "Achievements Profile: prajithp-1423 | Signed by Satya Nadella (6 Certificates)",
    skills: ["Power BI", "Data Modeling", "Power Query ETL", "DAX", "Report Design", "Row-Level Security"],
    description: "Unified 6-certificate learning suite from Microsoft Learn covering end-to-end data preparation, star schema modeling, report design, security, and data visualization.",
    featured: true
  },
  {
    id: "simplilearn-n8n-ai",
    title: "n8n Course: No Code AI Agent Builder",
    issuer: "Simplilearn SkillUp",
    date: "13th August 2026",
    image: "/images/certificates/simplilearn_n8n_ai_agent_builder.png",
    verificationCode: "Certificate Code: 10594867",
    skills: ["n8n Workflows", "No-Code AI Agents", "Agentic Tools", "API Webhooks", "Automation Pipelines"],
    description: "Completed specialized course on building autonomous no-code AI agents, configuring n8n workflow automation pipelines, custom API webhooks, and agentic tool integrations.",
    featured: true
  },
  {
    id: "simplilearn-ai-marketing",
    title: "AI Strategies for Marketing and Sales",
    issuer: "Simplilearn SkillUp",
    date: "13th August 2026",
    image: "/images/certificates/simplilearn_ai_marketing_sales.png",
    verificationCode: "Certificate Code: 10595747",
    skills: ["AI Marketing Strategy", "AI Sales Automation", "Customer Analytics", "Predictive Analytics"],
    description: "Professional course on leveraging generative AI and machine learning for marketing attribution, sales pipeline optimization, customer churn analytics, and lead scoring.",
    featured: true
  },
  {
    id: "letsgrowmore-cert",
    title: "Data Analyst Internship Program",
    issuer: "LetsGrowMore (MSME Govt. of India)",
    date: "June 6, 2026",
    image: "/images/certificates/letsgrowmore_completion_certificate.png",
    verificationCode: "CID: LGMVIPDS0002175 | Welcome CID: LGMVIPDSWL0005924",
    skills: ["Data Analytics", "Python", "SQL", "Power BI", "Dashboard Engineering", "Requirements Gathering"],
    description: "Completed 6-month internship program (Dec 2025 – May 2026) as Data Analyst, conducting dataset analysis, SQL querying, and Power BI reporting under LetsGrowMore (MSME Govt. of India recognized).",
    featured: true
  }
];
