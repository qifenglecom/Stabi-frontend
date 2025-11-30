import { useAaveAPY } from "@/hooks/useAaveAPY";

interface APYDisplayProps {
  assetAddress: `0x${string}`;
  colorClass?: string;
}

export function APYDisplay({ assetAddress, colorClass = "emerald" }: APYDisplayProps) {
  const { apy, isLoading } = useAaveAPY(assetAddress);

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="text-[11px] text-slate-500">Est. APY</div>
      <div className={`text-[20px] font-bold text-${colorClass}-300`}>
        {isLoading ? (
          <span className="text-slate-500 text-[16px]">Loading...</span>
        ) : apy ? (
          `~${apy}%`
        ) : (
          <span className="text-slate-500">N/A</span>
        )}
      </div>
    </div>
  );
}
