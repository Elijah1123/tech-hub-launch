import logo from '@/assets/mzalendo-logo.png.asset.json';
export function Brand({ className = '' }: { className?: string }) {
  return <img src={logo.url} alt="Mzalendo Tech Hub — We Equip and Transform" className={className} width={1536} height={768} />;
}
