"use client";

import { useState, useMemo, useEffect } from "react";
// Using custom SVG icons instead of lucide-react
const Plus = ({ className = "", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Trash2 = ({ className = "", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3,6 5,6 21,6"></polyline>
    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const Download = ({ className = "", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7,10 12,15 17,10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const Bot = ({ className = "", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <circle cx="12" cy="5" r="2"></circle>
    <path d="m12 7v4"></path>
    <line x1="8" y1="16" x2="8" y2="16"></line>
    <line x1="16" y1="16" x2="16" y2="16"></line>
  </svg>
);

const FileText = ({ className = "", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z"></path>
    <polyline points="14,2 14,8 20,8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10,9 9,9 8,9"></polyline>
  </svg>
);

const MessageSquare = ({ className = "", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const Users = ({ className = "", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="m22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="m16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

// ShadCN UI Components (self-contained for single-file deployment)
// In a real project, these would be imported from your components directory.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost: "hover:bg-gray-100 text-gray-700",
    link: "text-blue-600 underline-offset-4 hover:underline bg-transparent",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-xs",
    lg: "h-11 px-8 text-base",
    icon: "h-10 w-10 p-0",
  };

  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.default;

  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = ({ className = "", ...props }: TextareaProps) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

import React from "react";

// Table Component Types
interface TableProps {
  children: React.ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  className?: string;
}

interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: React.ReactNode;
  className?: string;
}

interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  children: React.ReactNode;
  className?: string;
}

// Card Component Types
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

// Table Components
const Table = ({ children, className = "", ...props }: TableProps) => (
  <div className="relative w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`} {...props}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, className = "" }: TableHeaderProps) => (
  <thead className={`[&_tr]:border-b [&_tr]:border-gray-800 ${className}`}>
    {children}
  </thead>
);

const TableBody = ({ children, className = "" }: TableBodyProps) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
    {children}
  </tbody>
);

const TableRow = ({ children, className = "", ...props }: TableRowProps) => (
  <tr
    className={`border-b border-gray-800 transition-colors hover:bg-gray-900/50 data-[state=selected]:bg-muted ${className}`}
    {...props}
  >
    {children}
  </tr>
);

const TableHead = ({ children, className = "", ...props }: TableHeadProps) => (
  <th
    className={`h-12 px-4 text-left align-middle font-medium text-gray-400 [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  >
    {children}
  </th>
);

const TableCell = ({ children, className = "", ...props }: TableCellProps) => (
  <td
    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  >
    {children}
  </td>
);

// Card Components
const Card = ({ children, className = "", ...props }: CardProps) => (
  <div
    className={`rounded-lg border border-gray-800 bg-black/30 text-white shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }: CardHeaderProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "", ...props }: CardTitleProps) => (
  <h3
    className={`text-xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({
  children,
  className = "",
  ...props
}: CardDescriptionProps) => (
  <p className={`text-sm text-gray-400 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = "" }: CardContentProps) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
};

// Sonner Toast (a simple implementation for this file)
interface Toast {
  id: string | number;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

// Define the component props
interface ToasterProps {
  toasts: Toast[];
}

const Toaster = ({ toasts }: ToasterProps) => (
  <div className="fixed bottom-0 right-0 z-50 m-4">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`mt-2 animate-fade-in flex items-center justify-between p-4 rounded-lg shadow-lg text-white ${
          toast.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {toast.message}
      </div>
    ))}
  </div>
);

interface Message {
  id: number | string;
  phone: string;
  message: string;
  timestamp?: Date;
}

interface PersonalizedData {
  id: number;
  phoneNumber: string;
  [key: string]: any;
}

interface Contact {
  id: number;
  phone: string;
  name: string;
}

export default function BulkMessageCMS() {
  const [activeTab, setActiveTab] = useState("bulk");

  // State for Bulk Message Tab
  const [messages, setMessages] = useState<Message[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [numToGenerate, setNumToGenerate] = useState(10);

  // State for Personalized Message Tab
  const [template, setTemplate] = useState(
    "Hello ${username}, you have ${day} remaining to recharge. Your balance is ${amount} KES."
  );
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [personalizedData, setPersonalizedData] = useState<PersonalizedData[]>([]);
  const [numToGeneratePersonalized, setNumToGeneratePersonalized] = useState(5);

  // State for Contact List Tab
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [numToGenerateContacts, setNumToGenerateContacts] = useState(10);

  type Country = "ghana" | "nigeria" | "kenya";

  interface CountryPhoneData {
    id: Country;
    code: string;
    prefixes: string[];
    length: number;
  }

  interface CountrySelections {
    ghana: boolean;
    nigeria: boolean;
    kenya: boolean;
  }

  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<CountrySelections>({
    ghana: true,
    nigeria: true,
    kenya: true,
  });

  useEffect(() => {
    const regex = /\$\{(.*?)\}/g;
    const foundPlaceholders = [
      ...new Set(Array.from(template.matchAll(regex), (m) => m[1])),
    ];
    setPlaceholders(foundPlaceholders);
  }, [template]);

  const addToast = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "error"
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleCountrySelectionChange = (country: Country) => {
    setSelectedCountries((prev) => ({ ...prev, [country]: !prev[country] }));
  };

  const generateRandomPhoneNumber = (
    activeCountries: CountryPhoneData[]
  ): string | null => {
    if (activeCountries.length === 0) return null;

    const country =
      activeCountries[Math.floor(Math.random() * activeCountries.length)];
    const prefix =
      country.prefixes[Math.floor(Math.random() * country.prefixes.length)];
    const numberLength = country.length - prefix.length;
    const min = Math.pow(10, numberLength - 1);
    const max = Math.pow(10, numberLength) - 1;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return `${country.code}${prefix}${randomNumber
      .toString()
      .padStart(numberLength, "0")}`;
  };

  const generateRandomFullName = () => {
    const firstNames = [
      "Kwame",
      "Abebe",
      "Chinedu",
      "Emeka",
      "Juma",
      "Kofi",
      "Ngozi",
      "Aisha",
      "Barack",
      "Fatima",
      "Zola",
      "Olamide",
      "Amina",
      "Sade",
      "Wale",
    ];
    const lastNames = [
      "Nkrumah",
      "Okoro",
      "Onyango",
      "Wanjala",
      "Adewale",
      "Bankole",
      "Mensah",
      "Mbeki",
      "Kenyatta",
      "Dangote",
      "Abiola",
      "Sowore",
    ];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  // --- Bulk Message Functions ---
  const handleAddMessage = () => {
    if (!phoneNumber.trim() || !message.trim()) {
      addToast("Please fill out both fields.");
      return;
    }
    if (!/^\d+$/.test(phoneNumber.trim())) {
      addToast("Please enter a valid phone number (digits only).");
      return;
    }
    const newMessage: Message = {
      id: Date.now(),
      phone: phoneNumber.trim(),
      message: message.trim(),
    };
    setMessages([...messages, newMessage]);
    setPhoneNumber("");
    setMessage("");
    addToast("Entry added successfully!", "success");
  };

  const handleDeleteMessage = (id: string | number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    addToast("Entry deleted.", "success");
  };

  const handleClearBulkMessages = () => {
    setMessages([]);
    addToast("All records have been cleared.", "success");
  };

  const handleAutoGenerate = () => {
    const allCountries: CountryPhoneData[] = [
      {
        id: "ghana",
        code: "233",
        length: 9,
        prefixes: ["24", "55", "20", "50", "54"],
      },
      {
        id: "nigeria",
        code: "234",
        length: 10,
        prefixes: ["803", "905", "706", "818", "703"],
      },
      {
        id: "kenya",
        code: "254",
        length: 9,
        prefixes: ["722", "718", "700", "799", "712"],
      },
    ];
    const activeCountries = allCountries.filter(
      (country) => selectedCountries[country.id]
    );
    if (activeCountries.length === 0) {
      addToast("Please select at least one country.");
      return;
    }

    const generatedMessages: Message[] = [];
    const messageTemplates = [
      "Hello! Our special offer ends this week.",
      "Hi there! Your weekly update is ready.",
      "Greetings! A friendly reminder for your appointment.",
      "Hi! Your package has been dispatched.",
      "Exclusive deal! Get 25% off with code SAVE25.",
    ];
    for (let i = 0; i < numToGenerate; i++) {
      const fullNumber = generateRandomPhoneNumber(activeCountries);
      const randomMessage =
        messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
      if (fullNumber)
        generatedMessages.push({
          id: Date.now() + i,
          phone: fullNumber,
          message: randomMessage,
        });
    }
    setMessages(generatedMessages);
    addToast(`${numToGenerate} records generated successfully!`, "success");
  };

  const handleExportToXlsx = () => {
    if (messages.length === 0) {
      addToast("List is empty.");
      return;
    }
    setIsExporting(true);

    const performExport = () => {
      const ws = (window as any).XLSX.utils.json_to_sheet(
        messages.map((m) => ({ PhoneNumber: m.phone, Message: m.message }))
      );
      ws["A1"].s = { font: { bold: true } };
      ws["B1"].s = { font: { bold: true } };
      ws["!cols"] = [{ wch: 20 }, { wch: 60 }];
      const wb = (window as any).XLSX.utils.book_new();
      (window as any).XLSX.utils.book_append_sheet(wb, ws, "Messages");
      (window as any).XLSX.writeFile(wb, "bulk_messages.xlsx");
      setIsExporting(false);
    };

    if ((window as any).XLSX) performExport();
    else {
      const script = document.createElement("script");
      script.src =
        "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js";
      script.onload = performExport;
      script.onerror = () => {
        addToast("Failed to load export library.");
        setIsExporting(false);
      };
      document.head.appendChild(script);
    }
  };

  // --- Personalized Message Functions ---
  const handlePersonalizedDataChange = (index: number, key: string, value: string) => {
    const newData = [...personalizedData];
    newData[index][key] = value;
    setPersonalizedData(newData);
  };

  const handleAddPersonalizedRow = () => {
    const newRow: PersonalizedData = { id: Date.now(), phoneNumber: "" };
    placeholders.forEach((p) => (newRow[p] = ""));
    setPersonalizedData([...personalizedData, newRow]);
  };

  const handleDeletePersonalizedRow = (id: number) => {
    setPersonalizedData(personalizedData.filter((row) => row.id !== id));
    addToast("Row deleted.", "success");
  };

  const generateMockData = (placeholder: string) => {
    const lowerPlaceholder = placeholder.toLowerCase();
    if (lowerPlaceholder.includes("name"))
      return generateRandomFullName().split(" ")[0];
    if (lowerPlaceholder.includes("day") || lowerPlaceholder.includes("count"))
      return Math.floor(Math.random() * 30) + 1;
    if (
      lowerPlaceholder.includes("amount") ||
      lowerPlaceholder.includes("balance")
    )
      return (Math.random() * 500).toFixed(2);
    return "Sample Data";
  };

  const handleGeneratePersonalized = () => {
    const allCountries: CountryPhoneData[] = [
      {
        id: "ghana",
        code: "233",
        length: 9,
        prefixes: ["24", "55", "20", "50", "54"],
      },
      {
        id: "nigeria",
        code: "234",
        length: 10,
        prefixes: ["803", "905", "706", "818", "703"],
      },
      {
        id: "kenya",
        code: "254",
        length: 9,
        prefixes: ["722", "718", "700", "799", "712"],
      },
    ];
    const activeCountries = allCountries.filter(
      (country) => selectedCountries[country.id]
    );
    if (activeCountries.length === 0) {
      addToast("Please select at least one country.");
      return;
    }

    const generatedData: PersonalizedData[] = [];
    for (let i = 0; i < numToGeneratePersonalized; i++) {
      const newRow: PersonalizedData = {
        id: Date.now() + i,
        phoneNumber: generateRandomPhoneNumber(activeCountries) || "",
      };
      placeholders.forEach((p) => (newRow[p] = generateMockData(p)));
      generatedData.push(newRow);
    }
    setPersonalizedData(generatedData);
    addToast(
      `${numToGeneratePersonalized} records generated successfully!`,
      "success"
    );
  };

  const handleClearPersonalizedData = () => {
    setPersonalizedData([]);
    addToast("All records have been cleared.", "success");
  };

  const handleExportPersonalizedToXlsx = () => {
    if (personalizedData.length === 0) {
      addToast("List is empty.");
      return;
    }
    setIsExporting(true);

    const performExport = () => {
      const headers = ["PhoneNumber", ...placeholders];
      const data = personalizedData.map((row) => {
        const rowData = [row.phoneNumber];
        placeholders.forEach((p) => rowData.push(row[p]));
        return rowData;
      });

      const ws = (window as any).XLSX.utils.aoa_to_sheet([headers, ...data]);

      headers.forEach((_, i) => {
        const cellRef = (window as any).XLSX.utils.encode_cell({ c: i, r: 0 });
        if (ws[cellRef]) ws[cellRef].s = { font: { bold: true } };
      });

      ws["!cols"] = headers.map((h) => ({
        wch: h.length > 15 ? h.length : 15,
      }));

      const wb = (window as any).XLSX.utils.book_new();
      (window as any).XLSX.utils.book_append_sheet(wb, ws, "Personalized Messages");
      (window as any).XLSX.writeFile(wb, "personalized_messages.xlsx");
      setIsExporting(false);
    };

    if ((window as any).XLSX) performExport();
    else {
      const script = document.createElement("script");
      script.src =
        "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js";
      script.onload = performExport;
      script.onerror = () => {
        addToast("Failed to load export library.");
        setIsExporting(false);
      };
      document.head.appendChild(script);
    }
  };

  // --- Contact List Functions ---
  const handleGenerateContacts = () => {
    const allCountries: CountryPhoneData[] = [
      {
        id: "ghana",
        code: "233",
        length: 9,
        prefixes: ["24", "55", "20", "50", "54"],
      },
      {
        id: "nigeria",
        code: "234",
        length: 10,
        prefixes: ["803", "905", "706", "818", "703"],
      },
      {
        id: "kenya",
        code: "254",
        length: 9,
        prefixes: ["722", "718", "700", "799", "712"],
      },
    ];
    const activeCountries = allCountries.filter(
      (country) => selectedCountries[country.id]
    );
    if (activeCountries.length === 0) {
      addToast("Please select at least one country.");
      return;
    }

    const generatedContacts: Contact[] = [];
    for (let i = 0; i < numToGenerateContacts; i++) {
      const fullNumber = generateRandomPhoneNumber(activeCountries);
      if (fullNumber)
        generatedContacts.push({
          id: Date.now() + i,
          phone: fullNumber,
          name: generateRandomFullName(),
        });
    }
    setContactList(generatedContacts);
    addToast(
      `${numToGenerateContacts} contacts generated successfully!`,
      "success"
    );
  };

  const handleClearContactList = () => {
    setContactList([]);
    addToast("All contacts have been cleared.", "success");
  };

  const handleDeleteContact = (id: number) => {
    setContactList(contactList.filter((c) => c.id !== id));
    addToast("Contact deleted.", "success");
  };

  const handleExportContactsToXlsx = () => {
    if (contactList.length === 0) {
      addToast("List is empty.");
      return;
    }
    setIsExporting(true);

    const performExport = () => {
      const ws = (window as any).XLSX.utils.json_to_sheet(
        contactList.map((c) => ({ PhoneNumber: c.phone, FullName: c.name }))
      );
      ws["A1"].s = { font: { bold: true } };
      ws["B1"].s = { font: { bold: true } };
      ws["!cols"] = [{ wch: 20 }, { wch: 25 }];
      const wb = (window as any).XLSX.utils.book_new();
      (window as any).XLSX.utils.book_append_sheet(wb, ws, "Contacts");
      
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `contact_list_${timestamp}.xlsx`;
      (window as any).XLSX.writeFile(wb, filename);
      setIsExporting(false);
    };

    if ((window as any).XLSX) performExport();
    else {
      const script = document.createElement("script");
      script.src =
        "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js";
      script.onload = performExport;
      script.onerror = () => {
        addToast("Failed to load export library.");
        setIsExporting(false);
      };
      document.head.appendChild(script);
    }
  };

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black font-sans min-h-screen">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .delay-150 { animation-delay: 0.15s; } .delay-300 { animation-delay: 0.3s; }
        .card-hover-effect { transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; }
        .card-hover-effect:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(255, 255, 255, 0.05); }
      `}</style>
      <Toaster toasts={toasts} />

      <main className="container mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold">Message Generator</h1>
          <p className="text-gray-400 mt-2">
            Create and export your contact lists, bulksms and personalized
            message sample.
          </p>
        </div>

        <div className="flex justify-center mb-8 animate-fadeInUp delay-150 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("bulk")}
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
              activeTab === "bulk"
                ? "text-white border-b-2 border-white"
                : "text-gray-500"
            }`}
          >
            <MessageSquare size={16} /> Bulk Messages
          </button>
          <button
            onClick={() => setActiveTab("personalized")}
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
              activeTab === "personalized"
                ? "text-white border-b-2 border-white"
                : "text-gray-500"
            }`}
          >
            <FileText size={16} /> Personalized Messages
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
              activeTab === "contacts"
                ? "text-white border-b-2 border-white"
                : "text-gray-500"
            }`}
          >
            <Users size={16} /> Contact List
          </button>
        </div>

        {activeTab === "bulk" && (
          <>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fadeInUp delay-300">
              <Card className="card-hover-effect">
                <CardHeader>
                  <CardTitle>Manual Entry</CardTitle>
                  <CardDescription>
                    Add a single phone number and message.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      id="phoneNumber"
                      placeholder="e.g. 233244123456"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={handleAddMessage}>
                    <Plus className="mr-2 h-4 w-4" /> Add to List
                  </Button>
                </CardContent>
              </Card>
              <Card className="card-hover-effect">
                <CardHeader>
                  <CardTitle>Auto Generator</CardTitle>
                  <CardDescription>
                    Generate random numbers and messages.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label
                      htmlFor="numToGenerate"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Number to Generate
                    </label>
                    <Input
                      type="number"
                      id="numToGenerate"
                      value={numToGenerate}
                      onChange={(e) =>
                        setNumToGenerate(
                          Math.max(1, parseInt(e.target.value, 10) || 1)
                        )
                      }
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Countries
                    </label>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="ghana"
                          checked={selectedCountries.ghana}
                          onChange={() => handleCountrySelectionChange("ghana")}
                          className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white"
                        />
                        <label
                          htmlFor="ghana"
                          className="ml-2 text-sm text-gray-300"
                        >
                          Ghana
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="nigeria"
                          checked={selectedCountries.nigeria}
                          onChange={() =>
                            handleCountrySelectionChange("nigeria")
                          }
                          className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white"
                        />
                        <label
                          htmlFor="nigeria"
                          className="ml-2 text-sm text-gray-300"
                        >
                          Nigeria
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="kenya"
                          checked={selectedCountries.kenya}
                          onChange={() => handleCountrySelectionChange("kenya")}
                          className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white"
                        />
                        <label
                          htmlFor="kenya"
                          className="ml-2 text-sm text-gray-300"
                        >
                          Kenya
                        </label>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={handleAutoGenerate}
                  >
                    <Bot className="mr-2 h-4 w-4" /> Generate
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="max-w-4xl mx-auto mt-12 animate-fadeInUp delay-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">
                  Your List ({messages.length})
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    onClick={handleClearBulkMessages}
                    disabled={messages.length === 0}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Clear All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleExportToXlsx}
                    disabled={messages.length === 0 || isExporting}
                  >
                    <Download className="mr-2 h-4 w-4" />{" "}
                    {isExporting ? "Exporting..." : "Export to Excel (.xlsx)"}
                  </Button>
                </div>
              </div>
              <div className="border border-gray-800 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.length > 0 ? (
                      messages.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-mono">
                            {item.phone}
                          </TableCell>
                          <TableCell className="max-w-xs">
                            {item.message}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteMessage(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-center text-gray-500 py-12"
                        >
                          Your list is empty.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}

        {activeTab === "personalized" && (
          <div className="animate-fadeInUp delay-300">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Message Template</CardTitle>
                <CardDescription>
                  Define your message with placeholders like{" "}
                  <code className="bg-gray-800 p-1 rounded text-xs">
                    ${`{variable}`}
                  </code>
                  . Columns will be generated automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>

            <div className="max-w-4xl mx-auto mt-8">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                    <div>
                      <CardTitle>Data Entry</CardTitle>
                      <CardDescription>
                        Fill in the data for each placeholder. The columns are
                        based on your template.
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={numToGeneratePersonalized}
                          onChange={(e) =>
                            setNumToGeneratePersonalized(
                              Math.max(1, parseInt(e.target.value, 10) || 1)
                            )
                          }
                          className="w-24"
                        />
                        <Button
                          variant="secondary"
                          onClick={handleGeneratePersonalized}
                        >
                          <Bot className="mr-2 h-4 w-4" /> Generate
                        </Button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                          Countries for Generation
                        </label>
                        <div className="flex justify-end flex-wrap gap-x-6 gap-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="ghana_p"
                              checked={selectedCountries.ghana}
                              onChange={() =>
                                handleCountrySelectionChange("ghana")
                              }
                              className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white"
                            />
                            <label
                              htmlFor="ghana_p"
                              className="ml-2 text-sm text-gray-300"
                            >
                              Ghana
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="nigeria_p"
                              checked={selectedCountries.nigeria}
                              onChange={() =>
                                handleCountrySelectionChange("nigeria")
                              }
                              className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white"
                            />
                            <label
                              htmlFor="nigeria_p"
                              className="ml-2 text-sm text-gray-300"
                            >
                              Nigeria
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="kenya_p"
                              checked={selectedCountries.kenya}
                              onChange={() =>
                                handleCountrySelectionChange("kenya")
                              }
                              className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white"
                            />
                            <label
                              htmlFor="kenya_p"
                              className="ml-2 text-sm text-gray-300"
                            >
                              Kenya
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border border-gray-800 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Phone Number</TableHead>
                          {placeholders.map((p) => (
                            <TableHead key={p}>{p}</TableHead>
                          ))}
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {personalizedData.length > 0 ? (
                          personalizedData.map((row, index) => (
                            <TableRow key={row.id}>
                              <TableCell>
                                <Input
                                  value={row.phoneNumber}
                                  onChange={(e) =>
                                    handlePersonalizedDataChange(
                                      index,
                                      "phoneNumber",
                                      e.target.value
                                    )
                                  }
                                  className="w-36"
                                />
                              </TableCell>
                              {placeholders.map((p) => (
                                <TableCell key={p}>
                                  <Input
                                    value={row[p] || ""}
                                    onChange={(e) =>
                                      handlePersonalizedDataChange(
                                        index,
                                        p,
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                              ))}
                              <TableCell className="text-right">
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() =>
                                    handleDeletePersonalizedRow(row.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={placeholders.length + 2}
                              className="text-center text-gray-500 py-12"
                            >
                              No data yet. Add rows manually or use Generate.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-between items-center mt-4 gap-4">
                    <Button
                      variant="outline"
                      onClick={handleAddPersonalizedRow}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Row
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="destructive"
                        onClick={handleClearPersonalizedData}
                        disabled={personalizedData.length === 0}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Clear All
                      </Button>
                      <Button
                        onClick={handleExportPersonalizedToXlsx}
                        disabled={personalizedData.length === 0 || isExporting}
                      >
                        <Download className="mr-2 h-4 w-4" />{" "}
                        {isExporting
                          ? "Exporting..."
                          : "Export to Excel (.xlsx)"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="animate-fadeInUp delay-300">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <Card className="card-hover-effect md:col-span-2">
                <CardHeader>
                  <CardTitle>Contact Generator</CardTitle>
                  <CardDescription>
                    Generate a list of random contacts with names and phone
                    numbers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="numToGenerateContacts"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Number to Generate
                      </label>
                      <Input
                        type="number"
                        id="numToGenerateContacts"
                        value={numToGenerateContacts}
                        onChange={(e) =>
                          setNumToGenerateContacts(
                            Math.max(1, parseInt(e.target.value, 10) || 1)
                          )
                        }
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Countries
                      </label>
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="ghana_c"
                            checked={selectedCountries.ghana}
                            onChange={() =>
                              handleCountrySelectionChange("ghana")
                            }
                            className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white"
                          />
                          <label
                            htmlFor="ghana_c"
                            className="ml-2 text-sm text-gray-300"
                          >
                            Ghana
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="nigeria_c"
                            checked={selectedCountries.nigeria}
                            onChange={() =>
                              handleCountrySelectionChange("nigeria")
                            }
                            className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white"
                          />
                          <label
                            htmlFor="nigeria_c"
                            className="ml-2 text-sm text-gray-300"
                          >
                            Nigeria
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="kenya_c"
                            checked={selectedCountries.kenya}
                            onChange={() =>
                              handleCountrySelectionChange("kenya")
                            }
                            className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white"
                          />
                          <label
                            htmlFor="kenya_c"
                            className="ml-2 text-sm text-gray-300"
                          >
                            Kenya
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={handleGenerateContacts}
                  >
                    <Bot className="mr-2 h-4 w-4" /> Generate Contacts
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="max-w-4xl mx-auto mt-12">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">
                  Generated Contacts ({contactList.length})
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    onClick={handleClearContactList}
                    disabled={contactList.length === 0}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Clear All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleExportContactsToXlsx}
                    disabled={contactList.length === 0 || isExporting}
                  >
                    <Download className="mr-2 h-4 w-4" />{" "}
                    {isExporting ? "Exporting..." : "Export to Excel (.xlsx)"}
                  </Button>
                </div>
              </div>
              <div className="border border-gray-800 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contactList.length > 0 ? (
                      contactList.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell className="font-mono">
                            {contact.phone}
                          </TableCell>
                          <TableCell>{contact.name}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-center text-gray-500 py-12"
                        >
                          Your contact list is empty.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}