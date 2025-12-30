
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/dashboard/date-picker';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { balanceHistoryData } from '@/lib/data';
import type { BalanceHistoryEntry } from '@/lib/types';
import { FileSpreadsheet } from 'lucide-react';

const BalanceHistoryTable = ({ data }: { data: BalanceHistoryEntry[] }) => {
  const formatCurrency = (amount: number) => {
    return amount.toFixed(2);
  };
  
  const totals = data.reduce((acc, curr) => {
    acc.deposit += curr.deposit;
    acc.withdraw += curr.withdraw;
    acc.wager += curr.wager;
    return acc;
  }, { deposit: 0, withdraw: 0, wager: 0 });
  
  const totalWinnings = data.reduce((acc, curr) => acc + curr.wager, 0);


  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Operación</TableHead>
            <TableHead>Depositar</TableHead>
            <TableHead>Retirar</TableHead>
            <TableHead>Wager</TableHead>
            <TableHead>Apuesta límite</TableHead>
            <TableHead>Balance antes de operación</TableHead>
            <TableHead>Divisa</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Tiempo</TableHead>
            <TableHead>Iniciador</TableHead>
            <TableHead>Del usuario</TableHead>
            <TableHead>Sistema</TableHead>
            <TableHead>Al usuario</TableHead>
            <TableHead>IP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.id}</TableCell>
                <TableCell>{entry.operation}</TableCell>
                <TableCell>{formatCurrency(entry.deposit)}</TableCell>
                <TableCell>{formatCurrency(entry.withdraw)}</TableCell>
                <TableCell>{formatCurrency(entry.wager)}</TableCell>
                <TableCell>{formatCurrency(entry.betLimit)}</TableCell>
                <TableCell>{formatCurrency(entry.balanceBefore)}</TableCell>
                <TableCell>{entry.currency}</TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.time}</TableCell>
                <TableCell>{entry.initiator}</TableCell>
                <TableCell>{entry.fromUser}</TableCell>
                <TableCell>{entry.system}</TableCell>
                <TableCell>{entry.toUser}</TableCell>
                <TableCell>{entry.ip}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={15} className="h-24 text-center">
                No hay datos disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-bold">En total</TableCell>
            <TableCell>{formatCurrency(totals.deposit)}</TableCell>
            <TableCell>{formatCurrency(totals.withdraw)}</TableCell>
            <TableCell>{formatCurrency(totals.wager)}</TableCell>
            <TableCell colSpan={10}></TableCell>
          </TableRow>
          <TableRow>
             <TableCell colSpan={2} className="font-bold">Ganancias</TableCell>
             <TableCell>{formatCurrency(totalWinnings)}</TableCell>
             <TableCell colSpan={12}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default function BalanceHistoryPage() {
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date('2025-12-29T00:00:00')
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    new Date('2025-12-29T23:59:59')
  );
  const [fromTime, setFromTime] = useState('00:00:00');
  const [toTime, setToTime] = useState('23:59:59');

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let formattedValue = '';

    if (rawValue.length > 0) {
      formattedValue = rawValue.slice(0, 2);
    }
    if (rawValue.length > 2) {
      formattedValue += ':' + rawValue.slice(2, 4);
    }
    if (rawValue.length > 4) {
      formattedValue += ':' + rawValue.slice(4, 6);
    }

    setter(formattedValue);
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader className='flex-row items-center justify-between'>
          <CardTitle>HISTORIA</CardTitle>
          <Button variant="ghost" size="icon">
              <FileSpreadsheet className="h-5 w-5" />
              <span className="sr-only">Exportar a Excel</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 items-end">
              <div className="flex flex-col gap-2">
                <Label>De</Label>
                <DatePicker
                    date={fromDate}
                    setDate={setFromDate}
                    className="w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>A</Label>
                <DatePicker
                    date={toDate}
                    setDate={setToDate}
                    className="w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="from-time">De Hora</Label>
                <Input
                    id="from-time"
                    type="text"
                    placeholder="00:00:00"
                    value={fromTime}
                    onChange={(e) => handleTimeChange(e, setFromTime)}
                    maxLength={8}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="to-time">A Hora</Label>
                <Input
                    id="to-time"
                    type="text"
                    placeholder="23:59:59"
                    value={toTime}
                    onChange={(e) => handleTimeChange(e, setToTime)}
                    maxLength={8}
                />
              </div>

               <div className="flex flex-col gap-2">
                <Label htmlFor="period">Elegir el periodo</Label>
                <Select>
                  <SelectTrigger id="period">
                    <SelectValue placeholder="Elegir el periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoy</SelectItem>
                    <SelectItem value="yesterday">Ayer</SelectItem>
                    <SelectItem value="this_week">Esta semana</SelectItem>
                    <SelectItem value="this_month">Este mes</SelectItem>
                    <SelectItem value="last_month">Mes anterior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
                 <div className="flex items-center gap-2">
                    <Label htmlFor="page" className="shrink-0">Página:</Label>
                    <Select defaultValue="1">
                        <SelectTrigger id="page">
                        <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex items-center gap-2">
                    <Label htmlFor="limit" className="shrink-0">Límites:</Label>
                    <Select defaultValue="100">
                        <SelectTrigger id="limit">
                        <SelectValue />
                        </TSelectTrigger>
                        <SelectContent>
                        {[10, 20, 50, 100].map(limit => (
                            <SelectItem key={limit} value={String(limit)}>{limit}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex flex-col gap-2">
                    <Label htmlFor="operation-type">Tipo operación</Label>
                    <Select defaultValue="to_user">
                        <SelectTrigger id="operation-type">
                        <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="to_user">Al usuario</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="flex flex-col gap-2">
                    <Label htmlFor="currency">Divisa</Label>
                    <Select defaultValue="ARS">
                        <SelectTrigger id="currency">
                        <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="ARS">ARS</SelectItem>
                           <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
            </div>
          </div>

          <BalanceHistoryTable data={balanceHistoryData} />
        </CardContent>
      </Card>
    </main>
  );
}
