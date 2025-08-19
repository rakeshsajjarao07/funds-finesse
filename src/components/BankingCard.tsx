import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BankingCard = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [availableBalance, setAvailableBalance] = useState(0);
  const { toast } = useToast();

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }

    setAvailableBalance(prev => prev + amount);
    setDepositAmount("");
    toast({
      title: "Deposit Successful",
      description: `$${amount.toFixed(2)} has been added to your account`,
      className: "bg-success text-success-foreground",
    });
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }

    if (amount > availableBalance) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      });
      return;
    }

    setAvailableBalance(prev => prev - amount);
    setWithdrawAmount("");
    toast({
      title: "Withdrawal Successful",
      description: `$${amount.toFixed(2)} has been withdrawn from your account`,
      className: "bg-warning text-warning-foreground",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--gradient-primary)' }}>
      <Card className="w-full max-w-md shadow-2xl border-0 backdrop-blur-sm" style={{ background: 'var(--gradient-card)', boxShadow: 'var(--shadow-card)' }}>
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full" style={{ background: 'var(--gradient-balance)', boxShadow: 'var(--shadow-glow)' }}>
              <Wallet className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Banking Portal</CardTitle>
          <p className="text-muted-foreground">Manage your finances securely</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Deposit Section */}
          <div className="space-y-3">
            <Label htmlFor="deposit" className="text-lg font-semibold text-foreground">
              Enter the Amount
            </Label>
            <div className="flex gap-2">
              <Input
                id="deposit"
                type="number"
                placeholder="0.00"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground"
              />
              <Button 
                onClick={handleDeposit}
                className="bg-deposit hover:bg-deposit/90 text-white px-6"
                disabled={!depositAmount}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Deposit
              </Button>
            </div>
          </div>

          {/* Withdraw Section */}
          <div className="space-y-3">
            <Label htmlFor="withdraw" className="text-lg font-semibold text-foreground">
              Withdraw Amount
            </Label>
            <div className="flex gap-2">
              <Input
                id="withdraw"
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground"
              />
              <Button 
                onClick={handleWithdraw}
                className="bg-withdraw hover:bg-withdraw/90 text-white px-6"
                disabled={!withdrawAmount}
              >
                <MinusCircle className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>

          {/* Balance Section */}
          <div className="space-y-3 pt-4 border-t border-border/50">
            <Label className="text-lg font-semibold text-foreground">
              Available Balance
            </Label>
            <div 
              className="p-6 rounded-lg border-2 border-primary/20 text-center"
              style={{ background: 'var(--gradient-balance)' }}
            >
              <div className="text-3xl font-bold text-white mb-1">
                ${availableBalance.toFixed(2)}
              </div>
              <div className="text-sm text-white/80">
                Current Balance
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankingCard;