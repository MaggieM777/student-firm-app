import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
    <div className="p-6 max-w-4xl mx-auto space-y-8 bg-gray-50 rounded-lg shadow-lg">
      <Card>
        <CardContent className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-700">Add Firm</h2>
          <div className="flex gap-4">
            <Input
              placeholder="Firm name"
              value={firmInput.name}
              onChange={(e) => setFirmInput({ ...firmInput, name: e.target.value })}
              className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              placeholder="Quota"
              type="number"
              value={firmInput.quota}
              onChange={(e) => setFirmInput({ ...firmInput, quota: e.target.value })}
              className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={addFirm}
              className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              Add Firm
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            Current firms: {firms.map(f => `${f.name} (${f.quota})`).join(", ")}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-700">Add Student</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Input
              placeholder="Name"
              value={studentInput.name}
              onChange={(e) => setStudentInput({ ...studentInput, name: e.target.value })}
              className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              placeholder="Points"
              type="number"
              value={studentInput.points}
              onChange={(e) => setStudentInput({ ...studentInput, points: e.target.value })}
              className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
            <Button
              onClick={addStudent}
              className="col-span-2 md:col-span-1 bg-green-500 text-white p-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
            >
              Add Student
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={classifyStudents}
          className="bg-purple-500 text-white p-2 rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
        >
          Classify
        </Button>
      </div>

      {students.length > 0 && (
        <Card>
          <CardContent className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700">Added Students</h2>
            <ul className="space-y-4">
              {students.map((student, idx) => (
                <li key={idx} className="flex items-center justify-between p-4 border-b rounded-lg bg-gray-50">
                  <div>
                    <span className="font-semibold text-gray-800">{student.name}</span>
                    <span className="ml-4 text-sm text-gray-600">{student.points} Points</span>
                    <div className="text-xs text-gray-500">Choices: {student.choices.join(", ")}</div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {results.length > 0 && (
        <Card>
          <CardContent className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700">Results</h2>
            <ul className="space-y-4">
              {results.map((r, idx) => (
                <li key={idx} className="flex justify-between p-4 border-b rounded-lg bg-gray-50">
                  <span className="font-semibold text-gray-800">{r.name}</span>
                  <strong className="text-blue-500">{r.firm}</strong>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
