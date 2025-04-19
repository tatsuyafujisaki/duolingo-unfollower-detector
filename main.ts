import { DOMParser } from "jsr:@b-fuze/deno-dom";
import * as path from "jsr:@std/path";

async function extractAndSaveH3Values() {
  try {
    const desktopPath = Deno.env.get("HOME") + "/Desktop"; // Construct Desktop path
    const inputFilename = Deno.args[0];
    const outputFilename = Deno.args[1];

    if (!inputFilename || !outputFilename) {
      throw new Error(
        "Please provide both input and output filenames as arguments.",
      );
    }

    const inputPath = path.join(desktopPath, inputFilename); // Combine Desktop path with filename
    const outputPath = path.join(desktopPath, outputFilename);

    const htmlContent = await Deno.readTextFile(inputPath);

    // Parse HTML
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    if (!doc) {
      throw new Error(`Failed to parse HTML document from ${inputPath}`);
    }

    // Select all h3 elements with the specified classes
    const h3Elements = doc.querySelectorAll("h3._2iA7Q._2jQO8");

    // Extract text content from elements
    const values = Array.from(h3Elements)
      .map((element) => element.textContent.trim())
      .filter((text) => text.length > 0); // Remove empty strings

    // Remove duplicates and sort
    const uniqueSortedValues = [...new Set(values)].sort();

    // Join with newlines
    const outputContent = uniqueSortedValues.join("\n");

    await Deno.writeTextFile(outputPath, outputContent);

    console.log(
      `Successfully processed ${uniqueSortedValues.length} unique values`,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

// Run the function
await extractAndSaveH3Values();
