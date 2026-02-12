interface PartyChipProps {
  name: string;
  color?: string | null;
  href?: string;
  selected?: boolean;
}

export function PartyChip({ name, color, href, selected = false }: PartyChipProps) {
  const style = color ? { borderColor: color, color: color } : {};

  const className = `inline-flex items-center rounded-full border-2 px-3 py-1 text-sm font-medium transition-all duration-200 hover:scale-[1.05] hover:shadow-sm ${selected ? "ring-2 ring-offset-1" : "hover:opacity-80"}`;

  const inner = (
    <>
      {color && (
        <span
          className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      {name}
    </>
  );

  if (href) {
    return (
      <a href={href} className={className} style={style}>
        {inner}
      </a>
    );
  }
  return (
    <span className={className} style={style}>
      {inner}
    </span>
  );
}
