import { useState } from "react";
import { Button } from "./components/ui/button"; // Обновен път
import { Card, CardContent } from "./components/ui/card"; // Обновен път
import { Input } from "./components/ui/input"; // Обновен път

export default function App() {
  const [students, setStudents] = useState([]);
  const [firms, setFirms] = useState([]);
  const [results, setResults] = useState([]);

  const [studentInput, setStudentInput] = useState({ name: "", points: "", choices: ["", "", "", ""] });
  const [firmInput, setFirmInput] = useState({ name: "", quota: "" });

  const addStudent = () => {
    if (!studentInput.name || !studentInput.points) return;
    setStudents([...students, { ...studentInput, points: Number(studentInput.points) }]);
    setStudentInput({ name: "", points: "", choices: ["", "", "", ""] });
  };

  const addFirm = () => {
    if (!firmInput.name || !firmInput.quota) return;
    setFirms([...firms, { ...firmInput, quota: Number(firmInput.quota) }]);
    setFirmInput({ name: "", quota: "" });
  };

  const classifyStudents = () => {
    const sortedStudents = [...students].sort((a, b) => b.points - a.points);
    const firmSlots = Object.fromEntries(firms.map(f => [f.name, f.quota]));
    const placements = [];

    for (const student of sortedStudents) {
      let placed = false;
      for (const choice of student.choices) {
        if (firmSlots[choice] > 0) {
          placements.push({ name: student.name, firm: choice });
          firmSlots[choice]--;
          placed = true;
          break;
        }
      }
      if (!placed) {
        placements.push({ name: student.name, firm: "Not Assigned" });
      }
    }
    setResults(placements);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-xl font-bold">Add Firm</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Firm name"
              value={firmInput.name}
              onChange={(e) => setFirmInput({ ...firmInput, name: e.target.value })}
            />
            <Input
              placeholder="Quota"
              type="number"
              value={firmInput.quota}
              onChange={(e) => setFirmInput({ ...firmInput, quota: e.target.value })}
            />
            <Button onClick={addFirm}>Add Firm</Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Current firms: {firms.map(f => `${f.name} (${f.quota})`).join(", ")}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-xl font-bold">Add Student</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <Input
              placeholder="Name"
              value={studentInput.name}
              onChange={(e) => setStudentInput({ ...studentInput, name: e.target.value })}
            />
            <Input
              placeholder="Points"
              type="number"
              value={studentInput.points}
              onChange={(e) => setStudentInput({ ...studentInput, points: e.target.value })}
            />
            {studentInput.choices.map((choice, idx) => (
              <Input
                key={idx}
                placeholder={`Choice ${idx + 1}`}
                value={choice}
                onChange={(e) => {
                  const newChoices = [...studentInput.choices];
                  newChoices[idx] = e.target.value;
                  setStudentInput({ ...studentInput, choices: newChoices });
                }}
              />
            ))}
            <Button onClick={addStudent} className="col-span-2 md:col-span-1">Add Student</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={classifyStudents}>Classify</Button>
      </div>

      {results.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">Results</h2>
            <ul className="space-y-1">
              {results.map((r, idx) => (
                <li key={idx} className="border-b py-1">{r.name} → <strong>{r.firm}</strong></li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
