import React from 'react';
import PropTypes from 'prop-types';

const scale = [0, 4, 8, 16, 32, 64, 128];

const colors = {
  black: '#111',
  green: '#2ecc40',
  midgray: '#888',
  red: '#ff4136',
  white: '#fff',
};

const colorValue = value => colors[value] || value;
const spaceValue = value => (typeof value === 'number' ? scale[value] || value : value);

const spacingStyle = (props) => {
  const style = {};
  const set = (property, value) => {
    if (value !== undefined) {
      style[property] = spaceValue(value);
    }
  };

  set('margin', props.m);
  set('marginTop', props.mt !== undefined ? props.mt : props.my);
  set('marginRight', props.mr !== undefined ? props.mr : props.mx);
  set('marginBottom', props.mb !== undefined ? props.mb : props.my);
  set('marginLeft', props.ml !== undefined ? props.ml : props.mx);
  set('padding', props.p);
  set('paddingTop', props.pt !== undefined ? props.pt : props.py);
  set('paddingRight', props.pr !== undefined ? props.pr : props.px);
  set('paddingBottom', props.pb !== undefined ? props.pb : props.py);
  set('paddingLeft', props.pl !== undefined ? props.pl : props.px);

  return style;
};

const layoutStyle = props => ({
  ...(props.width !== undefined ? { width: typeof props.width === 'number' && props.width <= 1 ? `${props.width * 100}%` : props.width } : {}),
  ...(props.color ? { color: colorValue(props.color) } : {}),
  ...(props.bg ? { backgroundColor: colorValue(props.bg) } : {}),
  ...(props.backgroundColor ? { backgroundColor: colorValue(props.backgroundColor) } : {}),
});

const cleanProps = (props) => {
  const {
    align,
    alignItems,
    auto,
    backgroundColor,
    bg,
    big,
    color,
    flexColumn,
    flexWrap,
    fontSize,
    gutter,
    is,
    justify,
    justifyContent,
    level,
    m,
    mb,
    ml,
    mr,
    mt,
    mx,
    my,
    p,
    pb,
    pl,
    pr,
    pt,
    px,
    py,
    tagName,
    theme,
    wrap,
    ...rest
  } = props;

  return rest;
};

export const Box = ({ children, is, style, tagName, ...props }) => {
  const Element = typeof is === 'string' && is !== 'object' ? is : tagName || 'div';

  return (
    <Element
      {...cleanProps(props)}
      style={{ ...spacingStyle(props), ...layoutStyle(props), ...style }}
    >
      {children}
    </Element>
  );
};

Box.propTypes = {
  children: PropTypes.node,
  is: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  style: PropTypes.object,
  tagName: PropTypes.string,
};

Box.defaultProps = {
  children: null,
  is: undefined,
  style: undefined,
  tagName: undefined,
};

export const Flex = ({ align, alignItems, children, flexColumn, justify, justifyContent, style, wrap, ...props }) => (
  <Box
    {...props}
    style={{
      display: 'flex',
      flexDirection: flexColumn ? 'column' : undefined,
      flexWrap: wrap ? 'wrap' : undefined,
      alignItems: alignItems || align,
      justifyContent: justifyContent || justify,
      ...style,
    }}
  >
    {children}
  </Box>
);

Flex.propTypes = {
  align: PropTypes.string,
  alignItems: PropTypes.string,
  children: PropTypes.node,
  flexColumn: PropTypes.bool,
  justify: PropTypes.string,
  justifyContent: PropTypes.string,
  style: PropTypes.object,
  wrap: PropTypes.bool,
};

Flex.defaultProps = {
  align: undefined,
  alignItems: undefined,
  children: null,
  flexColumn: false,
  justify: undefined,
  justifyContent: undefined,
  style: undefined,
  wrap: false,
};

export const Button = ({ big, children, pill, style, ...props }) => (
  <button
    {...cleanProps(props)}
    style={{
      border: 0,
      borderRadius: pill ? 9999 : 4,
      color: colorValue(props.color || 'white'),
      cursor: props.onClick ? 'pointer' : undefined,
      fontSize: big ? 18 : 14,
      fontWeight: 700,
      padding: big ? '12px 20px' : '8px 12px',
      ...layoutStyle(props),
      ...spacingStyle(props),
      ...style,
    }}
  >
    {children}
  </button>
);

Button.propTypes = {
  big: PropTypes.bool,
  children: PropTypes.node,
  pill: PropTypes.bool,
  style: PropTypes.object,
};

Button.defaultProps = {
  big: false,
  children: null,
  pill: false,
  style: undefined,
};

export const ButtonOutline = props => (
  <Button
    {...props}
    style={{
      backgroundColor: 'transparent',
      border: `1px solid ${colorValue(props.color || 'green')}`,
      color: colorValue(props.color || 'green'),
      ...(props.style || {}),
    }}
  />
);

export const ButtonCircle = ({ children, size, style, ...props }) => {
  const Element = props.href ? 'a' : 'button';

  return (
    <Element
      {...cleanProps(props)}
      style={{
        alignItems: 'center',
        border: 0,
        borderRadius: '50%',
        cursor: props.onClick || props.href ? 'pointer' : undefined,
        display: 'inline-flex',
        height: size,
        justifyContent: 'center',
        textDecoration: 'none',
        width: size,
        ...layoutStyle(props),
        ...spacingStyle(props),
        ...style,
      }}
    >
      {children}
    </Element>
  );
};

ButtonCircle.propTypes = {
  children: PropTypes.node,
  size: PropTypes.number,
  style: PropTypes.object,
};

ButtonCircle.defaultProps = {
  children: null,
  size: 40,
  style: undefined,
};

export const Container = ({ children, style, ...props }) => (
  <Box
    {...props}
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 1024,
      paddingLeft: 16,
      paddingRight: 16,
      width: '100%',
      ...style,
    }}
  >
    {children}
  </Box>
);

Container.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

Container.defaultProps = {
  children: null,
  style: undefined,
};

export const Banner = ({ backgroundImage, children, style, ...props }) => (
  <Flex
    {...props}
    align="center"
    flexColumn
    justify="center"
    style={{
      backgroundImage,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      minHeight: 320,
      textAlign: 'center',
      ...style,
    }}
  >
    {children}
  </Flex>
);

Banner.propTypes = {
  backgroundImage: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

Banner.defaultProps = {
  backgroundImage: undefined,
  children: null,
  style: undefined,
};

export const Blockquote = props => <Box tagName="blockquote" {...props} style={{ fontStyle: 'italic', ...(props.style || {}) }} />;
export const Divider = props => <Box tagName="hr" {...props} style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.25)', ...(props.style || {}) }} />;
export const Footer = props => <Box tagName="footer" {...props} />;
export const Label = props => <Text tagName="span" bold {...props} />;
export const Panel = props => <Box {...props} style={{ background: '#fff', color: '#111', margin: '48px auto', maxWidth: 760, padding: 16, ...(props.style || {}) }} />;
export const Space = ({ auto }) => <span style={auto ? { flex: '1 1 auto' } : { display: 'inline-block', width: 8 }} />;
export const Text = ({ bold, children, small, tagName, ...props }) => (
  <Box
    tagName={tagName || 'div'}
    {...props}
    style={{
      fontSize: small ? 12 : undefined,
      fontWeight: bold ? 700 : undefined,
      ...props.style,
    }}
  >
    {children}
  </Box>
);

Text.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node,
  small: PropTypes.bool,
  tagName: PropTypes.string,
};

Text.defaultProps = {
  bold: false,
  children: null,
  small: false,
  tagName: undefined,
};

export const Heading = ({ children, level, ...props }) => {
  const tagName = `h${level || 2}`;

  return (
    <Text
      tagName={tagName}
      {...props}
      style={{
        fontSize: props.size !== undefined ? scale[props.size] : undefined,
        lineHeight: 1.15,
        margin: 0,
        ...props.style,
      }}
    >
      {children}
    </Text>
  );
};

Heading.propTypes = {
  children: PropTypes.node,
  level: PropTypes.number,
};

Heading.defaultProps = {
  children: null,
  level: 2,
};

export const Message = ({ children, theme, ...props }) => (
  <Box
    {...props}
    style={{
      backgroundColor: theme === 'error' ? '#fee' : '#eef',
      color: theme === 'error' ? '#900' : '#003',
      padding: 16,
      ...props.style,
    }}
  >
    {children}
  </Box>
);

Message.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string,
};

Message.defaultProps = {
  children: null,
  theme: undefined,
};

export const NavItem = ({ children, style, ...props }) => (
  <Box
    {...props}
    style={{
      cursor: props.onClick ? 'pointer' : undefined,
      display: 'inline-block',
      fontWeight: 700,
      padding: '8px 12px',
      ...style,
    }}
  >
    {children}
  </Box>
);

NavItem.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

NavItem.defaultProps = {
  children: null,
  style: undefined,
};

export const Toolbar = ({ children, style, ...props }) => (
  <Flex
    {...props}
    align="center"
    style={{
      minHeight: 48,
      padding: '8px 16px',
      ...style,
    }}
  >
    {children}
  </Flex>
);

Toolbar.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

Toolbar.defaultProps = {
  children: null,
  style: undefined,
};

export const Arrow = () => <span style={{ display: 'inline-block', marginLeft: 4 }}>▾</span>;
export const Close = props => <button {...props} style={{ background: 'transparent', border: 0, cursor: 'pointer', fontSize: 24 }}>×</button>;
export const Dropdown = props => <Box {...props} style={{ position: 'relative', ...(props.style || {}) }} />;
export const DropdownMenu = ({ children, open, right, style, ...props }) => (
  open ? (
    <Box
      {...props}
      style={{
        background: '#fff',
        boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
        color: '#111',
        minWidth: 140,
        position: 'absolute',
        right: right ? 0 : undefined,
        top: '100%',
        zIndex: 10,
        ...style,
      }}
    >
      {children}
    </Box>
  ) : null
);

DropdownMenu.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  right: PropTypes.bool,
  style: PropTypes.object,
};

DropdownMenu.defaultProps = {
  children: null,
  open: false,
  right: false,
  style: undefined,
};

export const Overlay = ({ children, className, onDismiss, open, style }) => (
  open ? (
    <div
      className={className}
      onClick={onDismiss}
      role="presentation"
      style={{
        alignItems: 'center',
        background: 'rgba(0,0,0,0.75)',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        overflowY: 'auto',
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 20,
        ...style,
      }}
    >
      <div onClick={event => event.stopPropagation()} role="presentation">
        {children}
      </div>
    </div>
  ) : null
);

Overlay.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onDismiss: PropTypes.func,
  open: PropTypes.bool,
  style: PropTypes.object,
};

Overlay.defaultProps = {
  children: null,
  className: undefined,
  onDismiss: undefined,
  open: true,
  style: undefined,
};

export const PageHeader = ({ children, description, heading, ...props }) => (
  <Box {...props}>
    <Heading level={1}>{heading}</Heading>
    {description && <Text color="midgray">{description}</Text>}
    {children}
  </Box>
);

PageHeader.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  heading: PropTypes.string,
};

PageHeader.defaultProps = {
  children: null,
  description: undefined,
  heading: undefined,
};

export const PanelHeader = ({ children, style, ...props }) => (
  <Flex
    {...props}
    align="center"
    style={{
      borderBottom: '1px solid #ddd',
      marginBottom: 16,
      paddingBottom: 8,
      ...style,
    }}
  >
    {children}
  </Flex>
);

PanelHeader.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

PanelHeader.defaultProps = {
  children: null,
  style: undefined,
};

export const Stat = ({ label, unit, value, ...props }) => (
  <Box {...props} style={{ minWidth: 120, textAlign: 'center', ...(props.style || {}) }}>
    <Text color={props.color} style={{ fontSize: 32, fontWeight: 700 }}>{value}{unit}</Text>
    <Text small color="midgray">{label}</Text>
  </Box>
);

Stat.propTypes = {
  label: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Stat.defaultProps = {
  unit: '',
};
