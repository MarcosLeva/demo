
'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { users as statisticsData } from '@/lib/data';
import type { User as StatisticsEntry } from '@/lib/types';
import { FileSpreadsheet, Home, ChevronRight, Search, X } from 'lucide-react';
import { PaginationControls } from '@/components/dashboard/pagination-controls';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';

const StatisticsTable = ({ data }: { data: StatisticsEntry[] }) => {
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const totalDeposits = data.reduce((acc, curr) => acc + curr.deposits, 0);
  const totalWithdrawals = data.reduce((acc, curr) => acc + curr.withdrawals, 0);
  const totalWinnings = data.reduce((acc, curr) => acc + curr.winnings, 0);

  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID de usuario</TableHead>
            <TableHead>Login</TableHead>
            <TableHead className="text-right">Depositar</TableHead>
            <TableHead className="text-right">Retirar</TableHead>
            <TableHead className="text-right">Ganancias</TableHead>
            <TableHead className="text-right">RTP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.id}</TableCell>
                <TableCell>{entry.login}</TableCell>
                <TableCell className="text-right">{formatCurrency(entry.deposits)}</TableCell>
                <TableCell className="text-right">{formatCurrency(entry.withdrawals)}</TableCell>
                <TableCell className="text-right">{formatCurrency(entry.winnings)}</TableCell>
                <TableCell className="text-right">64.65</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No hay datos disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
            <TableRow>
                <TableCell colSpan={2} className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(totalDeposits)}</TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(totalWithdrawals)}</TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(totalWinnings)}</TableCell>
                <TableCell className="text-right font-bold">64.43</TableCell>
            </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};


export default function StatisticsPage() {
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date('2025-12-29T00:00:00')
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    new Date('2025-12-29T23:59:59')
  );
  const [fromTime, setFromTime] = useState('00:00:00');
  const [toTime, setToTime] = useState('23:59:59');
  const [showFilterConditions, setShowFilterConditions] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredData = useMemo(() => {
    // This is where you would filter data based on date/time pickers
    // For now, it just returns all data
    return statisticsData;
  }, []);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/dashboard"><Home className="h-4 w-4" /></Link>
        <ChevronRight className="h-4 w-4" />
        <span>Estadísticas</span>
      </div>
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-end">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="stats-type">Tipo de estadística</Label>
                    <Select defaultValue="cash">
                        <SelectTrigger id="stats-type"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cash">Efectivo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="convert-amounts">Convertir montos</Label>
                    <Select defaultValue="selected-currency">
                        <SelectTrigger id="convert-amounts"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="selected-currency">Mostrar en la moneda seleccionada</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="group-by">Agrupar por</Label>
                    <div className='flex gap-2'>
                        <Select defaultValue="superagent">
                            <SelectTrigger id="group-by"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="superagent">Superagente</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="type1">Tipo 1</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="table-config">Configuración de tabla</Label>
                    <div className='flex gap-2'>
                        <Select>
                            <SelectTrigger id="table-config"><SelectValue placeholder="Seleccionar columnas" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="col1">Columna 1</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="ARS">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ARS">ARS</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Inicio del período</Label>
                    <div className="flex gap-2">
                        <DatePicker date={fromDate} setDate={setFromDate} className="w-full" />
                        <Input type="text" placeholder="00:00:00" value={fromTime} onChange={(e) => handleTimeChange(e, setFromTime)} maxLength={8} className="w-28" />
                    </div>
                </div>
                 <div className="flex flex-col gap-2">
                    <Label>Fin del período</Label>
                    <div className="flex gap-2">
                        <DatePicker date={toDate} setDate={setToDate} className="w-full" />
                        <Input type="text" placeholder="23:59:59" value={toTime} onChange={(e) => handleTimeChange(e, setToTime)} maxLength={8} className="w-28" />
                    </div>
                </div>
                 <div className="flex flex-col gap-2">
                    <Label htmlFor="period">Elegir el periodo</Label>
                    <Select>
                    <SelectTrigger id="period"><SelectValue placeholder="Elegir el periodo" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="today">Hoy</SelectItem>
                        <SelectItem value="yesterday">Ayer</SelectItem>
                        <SelectItem value="this_week">Esta semana</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="border-t pt-4 mt-4 space-y-4">
                <div className="flex justify-between items-center">
                    <p className='text-sm'>Agregar un filtro o seleccionar una plantilla para generar un informe</p>
                    {!showFilterConditions && (
                        <Button variant="link" className="p-0 h-auto" onClick={() => setShowFilterConditions(true)}>Agregar filtro +</Button>
                    )}
                </div>

                {showFilterConditions && (
                  <div className="p-4 border rounded-lg space-y-4 relative bg-background">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Condiciones de aplicación del filtro</h3>
                        <Button variant="ghost" size="icon" onClick={() => setShowFilterConditions(false)} className="absolute top-2 right-2">
                            <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap items-end gap-2">
                          <Select defaultValue="deposit">
                              <SelectTrigger className="w-auto flex-grow sm:flex-grow-0 sm:w-[150px]"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="deposit">Depositar</SelectItem>
                              </SelectContent>
                          </Select>
                          <Select defaultValue="greater_than">
                              <SelectTrigger className="w-auto flex-grow sm:flex-grow-0 sm:w-[80px]"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="greater_than">{'>'}</SelectItem>
                                  <SelectItem value="less_than">{'<'}</SelectItem>
                                  <SelectItem value="equal_to">{'='}</SelectItem>
                              </SelectContent>
                          </Select>
                          <Input placeholder="0" className="w-auto flex-grow sm:flex-grow-0 sm:w-[120px]" />
                          <div className="flex items-center gap-2">
                              <Checkbox id="for-row" />
                              <Label htmlFor="for-row">Para la fila</Label>
                          </div>
                           <Button className="bg-green-600 hover:bg-green-700 flex-grow sm:flex-grow-0">Agregar filtro</Button>
                      </div>
                  </div>
                )}

                 <div className="flex items-center gap-4">
                    <Input placeholder="Ingrese el nombre de la plantilla" className="flex-1" />
                    <Button variant="outline">Crear plantilla</Button>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="saved-templates" className='shrink-0'>Plantillas guardadas:</Label>
                        <Select>
                            <SelectTrigger id="saved-templates" className="w-[180px]"><SelectValue placeholder="Borrador" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Borrador</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button className="bg-green-600 hover:bg-green-700">Mostrar Informe</Button>
                </div>
            </div>

          </div>
        </CardContent>
      </Card>

      <Card className='mt-8'>
        <CardHeader className='flex-row items-center justify-between'>
            <CardTitle>ESTADÍSTICAS</CardTitle>
            <div className="flex items-center gap-2">
                <Button>Crear un usuario</Button>
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8" />
                </div>
                <Button variant="ghost" size="icon">
                    <FileSpreadsheet className="h-5 w-5" />
                    <span className="sr-only">Exportar a Excel</span>
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          <StatisticsTable data={paginatedData} />
        </CardContent>
        <CardFooter>
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </CardFooter>
      </Card>
    </main>
  );
}

  