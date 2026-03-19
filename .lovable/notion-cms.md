# Notion CMS — Database Reference

## Database IDs

| Database | Notion URL | Data Source ID |
|----------|-----------|----------------|
| AI Contributors | https://www.notion.so/fc971b1e73a24fa2b99362342b423a98 | `d83bef4d-c5c6-45b0-843c-cd32cd165243` |
| AI Updates | https://www.notion.so/f48096ef2bac4036a81220e3035646fc | `f091564f-a9e5-45ac-9551-0e5fd1191046` |
| AI Roadmap | https://www.notion.so/76c3c4416c174b72aa42b5bc6655e367 | `9a3924cf-d100-4413-8639-102c557a38b2` |
| AI Encyclopedia | https://www.notion.so/6b02f1511b6c4e0a8f694c1c05d278b2 | `9e310975-a96c-4edf-a71c-11f05e020b90` |

## Sync Workflow

**Direction**: Notion → Codebase (one-way sync)

When you update content in Notion, tell Lovable: **"Sync [database name] from Notion"** and it will:
1. Fetch all entries from the Notion database via MCP
2. Transform the data to match the TypeScript interfaces
3. Update the corresponding `src/data/*.ts` file

### Content Mapping

| Notion Database | TypeScript File | Interface |
|----------------|----------------|-----------|
| AI Contributors | `src/data/aiContributors.ts` | `AIContributor` |
| AI Updates | `src/data/aiUpdates.ts` | `AIUpdate` |
| AI Roadmap | `src/data/aiRoadmap.ts` | `RoadmapTopic` |
| AI Encyclopedia | `src/data/aiEncyclopedia.ts` | `EncyclopediaConcept` |

### Field Conventions

- **JSON arrays** (videos, courses, books, repos, learnMore): Stored as text in Notion using JSON format `[{"title": "...", "url": "..."}]`
- **Comma-separated lists** (keyTerms, prerequisites, tocSections): Plain text separated by commas
- **Takeaways** (AI Updates): One takeaway per line
- **Tags** (AI Updates): Use Notion multi-select
- **Body** (AI Updates): HTML content stored as rich text
- **Connections** (Contributors): Comma-separated contributor IDs
- **GitHub Pinned Repos** (Contributors): Comma-separated repo names

### Category Mapping (Encyclopedia)

Notion uses "Safety Ethics & Governance" (no comma) which maps to "Safety, Ethics & Governance" in the codebase.

## Sample Entries

3 sample contributors have been seeded (Hinton, LeCun, Altman) to validate the schema.
The remaining ~97 contributors, 110 encyclopedia concepts, 18+ roadmap topics, and updates can be populated by:
1. Adding entries directly in Notion
2. Asking Lovable to bulk-populate from existing codebase data
