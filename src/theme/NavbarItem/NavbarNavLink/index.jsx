import NavbarNavLink from '@theme-original/NavbarItem/NavbarNavLink';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function NavbarNavLinkWithIcon({icon, label, ...props}) {
  const iconUrl = useBaseUrl(icon);
  return (
    <NavbarNavLink
      {...props}
      label={icon && !props.html ? (
        <span className={styles.label}>
          <img className={styles.icon} src={iconUrl} width="20" height="20" alt="" aria-hidden="true" />
          <span>{label}</span>
        </span>
      ) : label}
    />
  );
}
