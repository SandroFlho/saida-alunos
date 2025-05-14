import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mockAlunos = [
  { id: 1, nome: "Ana Souza", turma: "7A", autorizado: true },
  { id: 2, nome: "Carlos Lima", turma: "8B", autorizado: false },
  { id: 3, nome: "Beatriz Alves", turma: "6C", autorizado: true },
];

export default function TelaSaida() {
  const [busca, setBusca] = useState("");
  const [alunos, setAlunos] = useState(mockAlunos);
  const [saidas, setSaidas] = useState([]);

  const filtrarAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const registrarSaida = (aluno, tipo) => {
    const hora = new Date().toLocaleTimeString();
    setSaidas((prev) => [
      ...prev,
      { ...aluno, tipo, hora }
    ]);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Registrar Saída de Alunos</h1>
      <Input
        placeholder="Buscar aluno pelo nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtrarAlunos.map((aluno) => (
          <Card key={aluno.id} className="p-4">
            <CardContent>
              <div className="text-lg font-medium">{aluno.nome}</div>
              <div className="text-sm text-muted-foreground">Turma: {aluno.turma}</div>
              <div className="mt-2 space-x-2">
                {aluno.autorizado ? (
                  <>
                    <Button onClick={() => registrarSaida(aluno, "sozinho")}>
                      Sair Sozinho
                    </Button>
                    <Button variant="secondary" onClick={() => registrarSaida(aluno, "responsável")}>Com Responsável</Button>
                  </>
                ) : (
                  <Button onClick={() => registrarSaida(aluno, "responsável")}>Com Responsável</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Últimas saídas</h2>
        <ul className="space-y-1">
          {saidas.map((saida, idx) => (
            <li key={idx} className="text-sm">
              {saida.hora} - {saida.nome} ({saida.turma}) saiu {saida.tipo === "sozinho" ? "sozinho" : "com responsável"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
