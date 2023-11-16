"use client";

import { useAuth } from "@/api/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { Children } from "react";

export default function Page() {
  const router = useRouter();

  const pathName = usePathname();

  const { hasRoleAccess } = useAuth();
  const GridItem = ({ colSpan, rowSpan, label, children }) => {
    return (
      <div className={`col-span-${colSpan} row-span-${rowSpan} `}>
        <span className="text-sm">{label}</span>
        <div className=" bg-gray-300 h-10">{children}</div>
      </div>
    );
  };

  const gridItems = [
    { colSpan: "2", rowSpan: "5", label: "CPF", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "POSTO", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "VIA", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "DAE", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "SERIE", children: <></> },
    { colSpan: "5", rowSpan: "1", label: "NOME", children: <></> },
    { colSpan: "5", rowSpan: "1", label: "FILIACAO", children: <></> },
    { colSpan: "5", rowSpan: "1", label: "NOME SOCIAL", children: <></> },
    { colSpan: "5", rowSpan: "2", label: "ASSINATURA", children: <></> },
    { colSpan: "5", rowSpan: "2", label: "OBSERVACOES", children: <></> },
    { colSpan: "3", rowSpan: "1", label: "NACIONALIDADE", children: <></> },
    { colSpan: "3", rowSpan: "1", label: "NATURALIDADE", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "UF", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "DATA NASCIMENTO", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "TIPO SANGUINEO", children: <></> },
    { colSpan: "5", rowSpan: "2", label: "MATRICULA", children: <></> },
    { colSpan: "3", rowSpan: "1", label: "CERT", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "DATA EMISSAO", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "VIA", children: <></> },
    { colSpan: "3", rowSpan: "1", label: "CARTORIO", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "UF", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "SERIE", children: <></> },
    { colSpan: "8", rowSpan: "2", label: "CONJUGUE", children: <></> },
    { colSpan: "4", rowSpan: "2", label: "TIPO/N/ANO PORT MINIST", children: <></> },
    { colSpan: "5", rowSpan: "3", label: "MATRICULA", children: <></> },
    { colSpan: "3", rowSpan: "1", label: "CERT", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "DATA EMISSAO", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "VIA", children: <></> },
    { colSpan: "3", rowSpan: "1", label: "CARTORIO", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "UF", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "SERIE", children: <></> },
    { colSpan: "3", rowSpan: "1", label: "CNH", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "EMAIL", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "PASSAPORT", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "PROFISSAO", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "GRAU DE INSTRUCAO", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "estado ciVIL", children: <></> },
    { colSpan: "1", rowSpan: "1", label: "SEXO", children: <></> },
    { colSpan: "1", rowSpan: "1", label: "ALTURA ", children: <></> },
    { colSpan: "1", rowSpan: "1", label: "CUTIS", children: <></> },
    { colSpan: "1", rowSpan: "1", label: "OLHOS", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "COR DO CABELO", children: <></> },
    { colSpan: "5", rowSpan: "1", label: "ENDERECO", children: <></> },
    { colSpan: "1", rowSpan: "1", label: "NUMERO", children: <></> },
    { colSpan: "2", rowSpan: "1", label: "BAIRRO", children: <></> },
    { colSpan: "3", rowSpan: "1", label: "CIDADE", children: <></> },
    { colSpan: "1", rowSpan: "1", label: "UF", children: <></> },
    { colSpan: "5", rowSpan: "1", label: "COMPLEMENTO", children: <></> },
    { colSpan: "3", rowSpan: "1", label: "CEP", children: <></> },
    { colSpan: "4", rowSpan: "1", label: "TELEFONE", children: <></> },
    { colSpan: "4", rowSpan: "4", label: "Foto", children: <></> },
    { colSpan: "8", rowSpan: "2", label: "DEFICIENCIAS", children: <></> },
    { colSpan: "8", rowSpan: "2", label: "DEFICIENCIAS", children: <></> },
    { colSpan: "12", rowSpan: "1", label: "MATRICULA", children: <></> },
    { colSpan: "12", rowSpan: "1", label: "MATRICULA", children: <></> },
    { colSpan: "12", rowSpan: "1", label: "MATRICULA", children: <></> },
  ];
  return (
    <div className="grid grid-cols-12 gap-4">
      {gridItems.map((item) => (
        <GridItem {...item} />
      ))}
    </div>
  );
}
