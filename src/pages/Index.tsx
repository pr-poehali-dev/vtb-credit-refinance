import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface LoanData {
  clientName: string;
  approvedAmount: string;
  loanTerm: number;
  monthlyPayment: string;
  totalPayment: string;
  overpayment: string;
  kaskoTerm: number;
  requiresIncome: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [loanData, setLoanData] = useState<LoanData>({
    clientName: 'Иванов Алексей Петрович',
    approvedAmount: '1 281 111',
    loanTerm: 60,
    monthlyPayment: '19 692',
    totalPayment: '1 520 000',
    overpayment: '238 889',
    kaskoTerm: 5,
    requiresIncome: true
  });

  useEffect(() => {
    const savedData = localStorage.getItem('vtb-loan-data');
    if (savedData) {
      setLoanData(JSON.parse(savedData));
    }
  }, []);

  const saveLoanData = (newData: LoanData) => {
    setLoanData(newData);
    localStorage.setItem('vtb-loan-data', JSON.stringify(newData));
  };

  const handleFieldChange = (field: keyof LoanData, value: any) => {
    const updatedData = { ...loanData, [field]: value };
    saveLoanData(updatedData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-vtb-blue rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">ВТБ</span>
              </div>
              <div>
                <h1 className="text-sm font-medium text-gray-900">Партнерский кредитный кабинет</h1>
                <p className="text-xs text-gray-600">ПАО ВТБ Банк</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right text-xs text-gray-600">
                <p>CRM система партнерского кабинета</p>
                <p>кредитного отдела. Кабинет № К-5695-25.</p>
                <p>Старший кредитный специалист Шубин П.В.</p>
              </div>
              <TabsList className="bg-gray-100">
                <TabsTrigger value="main" className="text-xs px-3 py-1">Заявка</TabsTrigger>
                <TabsTrigger value="crm" className="text-xs px-3 py-1">CRM</TabsTrigger>
              </TabsList>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <TabsContent value="main" className="m-0">
          <div className="max-w-4xl mx-auto px-6 py-8 animate-fade-in">
            {/* Application Title */}
            <Card className="mb-6 p-6 border-l-4 border-l-vtb-blue">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Одобренная заявка на рефинансирование автокредита № А/С 2547-25
              </h2>
              <p className="text-sm text-gray-600">
                согласована клиент: <span className="font-medium">{loanData.clientName}</span>
              </p>
            </Card>

            {/* Loan Details */}
            <Card className="mb-6 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Параметры рефинансирования</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Одобренная сумма</p>
                  <p className="text-2xl font-bold text-vtb-blue">{loanData.approvedAmount} ₽</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Срок кредита</p>
                  <p className="text-2xl font-bold text-gray-900">{loanData.loanTerm} мес.</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ежемесячный платеж</p>
                  <p className="text-2xl font-bold text-gray-900">{loanData.monthlyPayment} ₽</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={16} className="text-vtb-blue mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 mb-1">Преимущества:</p>
                    <ul className="text-gray-700 space-y-1 text-xs">
                      <li>• Возможность досрочного погашения без штрафов и комиссий</li>
                      <li>• Отсутствие в кредите дополнительных страховых продуктов банков</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* KASKO Requirements */}
            <Card className="mb-6 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Требования по страхованию КАСКО</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 mb-2">
                      Для продолжения процедуры рефинансирования необходимо предоставить страховой полис КАСКО
                    </p>
                    <ul className="text-gray-700 space-y-1 text-xs">
                      <li>• Полис должен покрывать риски «угон» и «полная гибель» (Тотал)</li>
                      <li>• Срок полиса — {loanData.kaskoTerm} лет, оформляется единовременно клиентом самостоятельно</li>
                      <li>• Полис не включается в тело кредита при рефинансировании</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Requirements */}
            {loanData.requiresIncome && (
              <Card className="mb-6 p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Icon name="FileText" size={16} className="text-red-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900 mb-1">
                        Для продолжения процедуры рефинансирования клиенту необходимо предоставить справку 2-НДФЛ
                      </p>
                      <p className="text-gray-700 text-xs">
                        В связи с дополнительной проверкой платежеспособности клиента {loanData.clientName} банком.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Required Documents */}
            <Card className="mb-6 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Необходимые документы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Паспорт',
                  'СНИЛС', 
                  'Документы на автомобиль (заложенное имущество)',
                  'Полис ОСАГО',
                  'Кредитный договор по автокредиту с другим банком',
                  ...(loanData.requiresIncome ? ['Справка 2-НДФЛ'] : [])
                ].map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Контактная информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900">Адрес главного офиса</p>
                  <p className="text-gray-700">г. Москва, ул. Воздвиженка, д. 10</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Горячая линия</p>
                  <p className="text-gray-700">8 800 100-24-24</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Электронная почта</p>
                  <p className="text-gray-700">info@vtb.ru</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* CRM Panel */}
        <TabsContent value="crm" className="m-0">
          <div className="max-w-2xl mx-auto px-6 py-8 animate-fade-in">
            <Card className="p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Параметры заявки</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="clientName">ФИО клиента</Label>
                  <Input
                    id="clientName"
                    value={loanData.clientName}
                    onChange={(e) => handleFieldChange('clientName', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="approvedAmount">Одобренная сумма (₽)</Label>
                    <Input
                      id="approvedAmount"
                      value={loanData.approvedAmount}
                      onChange={(e) => handleFieldChange('approvedAmount', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyPayment">Ежемесячный платеж (₽)</Label>
                    <Input
                      id="monthlyPayment"
                      value={loanData.monthlyPayment}
                      onChange={(e) => handleFieldChange('monthlyPayment', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="loanTerm">Срок рефинансирования (месяцы)</Label>
                  <Select
                    value={loanData.loanTerm.toString()}
                    onValueChange={(value) => handleFieldChange('loanTerm', parseInt(value))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 109 }, (_, i) => i + 12).map((months) => (
                        <SelectItem key={months} value={months.toString()}>
                          {months} месяцев
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalPayment">Общая сумма выплат (₽)</Label>
                    <Input
                      id="totalPayment"
                      value={loanData.totalPayment}
                      onChange={(e) => handleFieldChange('totalPayment', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="overpayment">Переплата по кредиту (₽)</Label>
                    <Input
                      id="overpayment"
                      value={loanData.overpayment}
                      onChange={(e) => handleFieldChange('overpayment', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="kaskoTerm">Срок требования страхового полиса КАСКО (годы)</Label>
                  <Select
                    value={loanData.kaskoTerm.toString()}
                    onValueChange={(value) => handleFieldChange('kaskoTerm', parseInt(value))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((years) => (
                        <SelectItem key={years} value={years.toString()}>
                          {years} {years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="requiresIncome"
                    checked={loanData.requiresIncome}
                    onChange={(e) => handleFieldChange('requiresIncome', e.target.checked)}
                    className="h-4 w-4 text-vtb-blue rounded"
                  />
                  <Label htmlFor="requiresIncome" className="text-sm">
                    Требуется справка 2-НДФЛ
                  </Label>
                </div>

                <Button 
                  onClick={() => setActiveTab('main')} 
                  className="w-full bg-vtb-blue hover:bg-vtb-blue-dark"
                >
                  Сохранить и вернуться к заявке
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <footer className="bg-gray-800 text-white px-6 py-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-gray-300 leading-relaxed">
            <p className="mb-4">
              На основании пункта 3 статьи 8 Федерального закона № 130-ФЗ «Об обязательных видах страхования», 
              Банк в соответствии с действующим законодательством Российской Федерации, в частности, статьями 
              Гражданского кодекса РФ и законом «Об обязательных видах страхования» (ФЗ-40 от 25.04.2002), 
              а также внутренними нормативными актами банка ВТБ, банк имеет право вносить коррективы при 
              оформлении рефинансирования кредита и устанавливать свои условия рефинансирования автокредита, 
              в том числе требовать предоставление страхового полиса КАСКО.
            </p>
            <p className="text-gray-400">
              © 2024 ПАО ВТБ. Генеральная лицензия Банка России № 1000. 
              Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;