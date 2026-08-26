export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-backdrop opacity-60" />
      <div className="animate-aurora absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-cyan/25 blur-[120px]" />
      <div
        className="animate-aurora absolute -right-32 top-32 h-[32rem] w-[32rem] rounded-full bg-violet/25 blur-[130px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="animate-aurora absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan/15 blur-[140px]"
        style={{ animationDelay: "-11s" }}
      />
    </div>
  );
}
