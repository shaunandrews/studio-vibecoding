#!/usr/bin/env node

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Read the extraction prompt
const extractionPrompt = readFileSync('./extract.md', 'utf-8');

// Find the system prompt section (between "## System Prompt" and "## Task")
const systemPromptMatch = extractionPrompt.match(/## System Prompt\n\n(.*?)\n\n## Task/s);
const systemPrompt = systemPromptMatch ? systemPromptMatch[1] : 'You are a design system extraction specialist.';

// Get the full extraction instructions (everything after "## System Prompt")
const fullInstructions = extractionPrompt.substring(extractionPrompt.indexOf('## System Prompt'));

const samples = [
  { name: 'cafe', file: 'sample-cafe.css', output: 'result-cafe.json' },
  { name: 'portfolio', file: 'sample-portfolio.css', output: 'result-portfolio.json' },
  { name: 'shop', file: 'sample-shop.css', output: 'result-shop.json' }
];

async function extractDesignSystem(cssContent: string, sampleName: string) {
  console.log(`\n🔍 Analyzing ${sampleName} CSS...`);
  
  const message = `${fullInstructions}\n\n## CSS to Analyze:\n\n\`\`\`css\n${cssContent}\n\`\`\``;
  
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: message
      }]
    });

    const responseText = response.content[0]?.type === 'text' ? response.content[0].text : '';
    
    // Try to extract JSON from the response
    let jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // If no JSON found, try to parse the entire response
      jsonMatch = [responseText.trim()];
    }
    
    const jsonString = jsonMatch[0];
    const designSystem = JSON.parse(jsonString);
    
    return designSystem;
  } catch (error) {
    console.error(`❌ Failed to extract design system from ${sampleName}:`, error);
    return null;
  }
}

function logSummary(designSystem: any, sampleName: string) {
  if (!designSystem) return;
  
  console.log(`\n📊 ${sampleName.toUpperCase()} EXTRACTION SUMMARY:`);
  console.log(`   Colors: ${Object.keys(designSystem.colors || {}).length} palettes`);
  console.log(`   Typography: ${Object.keys(designSystem.typography?.fontSizes || {}).length} font sizes`);
  console.log(`   Spacing: ${Object.keys(designSystem.spacing || {}).length} spacing tokens`);
  console.log(`   Components: ${Object.keys(designSystem.components || {}).length} component types`);
  console.log(`   Patterns: ${(designSystem.analysis?.extractedPatterns || []).length} extracted patterns`);
  console.log(`   Issues: ${(designSystem.analysis?.issues || []).length} flagged issues`);
  console.log(`   Recommendations: ${(designSystem.analysis?.recommendations || []).length} recommendations`);
  
  // Show some example extractions
  if (designSystem.colors?.primary) {
    const primaryColors = Object.keys(designSystem.colors.primary);
    console.log(`   Primary colors: ${primaryColors.slice(0, 3).join(', ')}${primaryColors.length > 3 ? '...' : ''}`);
  }
  
  if (designSystem.analysis?.consolidations?.length > 0) {
    console.log(`   Key consolidation: ${designSystem.analysis.consolidations[0]}`);
  }
  
  if (designSystem.analysis?.issues?.length > 0) {
    console.log(`   Top issue: ${designSystem.analysis.issues[0]}`);
  }
}

async function main() {
  console.log('🚀 Starting AI Design System Extraction Test\n');
  console.log('This test will analyze messy AI-generated CSS samples and extract clean design systems.\n');
  
  for (const sample of samples) {
    try {
      // Read CSS sample
      const cssContent = readFileSync(sample.file, 'utf-8');
      console.log(`📁 Read ${sample.file} (${Math.round(cssContent.length / 1024)}KB)`);
      
      // Extract design system
      const designSystem = await extractDesignSystem(cssContent, sample.name);
      
      if (designSystem) {
        // Write result to file
        writeFileSync(sample.output, JSON.stringify(designSystem, null, 2));
        console.log(`💾 Saved design system to ${sample.output}`);
        
        // Log summary
        logSummary(designSystem, sample.name);
      } else {
        console.log(`❌ Failed to extract design system from ${sample.name}`);
      }
      
      // Add delay between requests to be respectful
      if (samples.indexOf(sample) < samples.length - 1) {
        console.log('\n⏳ Waiting 2 seconds before next request...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error) {
      console.error(`💥 Error processing ${sample.name}:`, error);
    }
  }
  
  console.log('\n✅ Extraction test complete!');
  console.log('\nResults saved to:');
  samples.forEach(sample => console.log(`   • ${sample.output}`));
  console.log('\n🔍 Review the JSON files to validate the extraction quality.');
}

// Run the test
main().catch(console.error);