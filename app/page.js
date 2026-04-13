import { readdir } from "node:fs/promises";
import path from "node:path";

async function getDirectoryEntries(directoryPath) {
  const items = await readdir(directoryPath, { withFileTypes: true });

  return items
    .map((item) => ({
      name: item.name,
      kind: item.isDirectory() ? "folder" : "file",
      path: path.join(directoryPath, item.name),
    }))
    .sort((a, b) => {
      if (a.kind !== b.kind) {
        return a.kind === "folder" ? -1 : 1;
      }

      return a.name.localeCompare(b.name);
    });
}

export default async function Home() {
  const currentDirectory = process.cwd();
  const entries = await getDirectoryEntries(currentDirectory);

  return (
    <main className="page">
      <section className="panel">
        <h1>File Manager</h1>
        <p className="subtitle">Showing files and folders in:</p>
        <p className="path">{currentDirectory}</p>

        <ul className="entries">
          {entries.map((entry) => (
            <li className="entry" key={entry.path}>
              <span className={`badge ${entry.kind}`}>{entry.kind}</span>
              <span className="name">{entry.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
