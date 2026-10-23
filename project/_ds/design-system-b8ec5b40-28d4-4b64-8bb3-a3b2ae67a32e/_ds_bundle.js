/* @ds-bundle: {"format":4,"namespace":"DesignSystem_b8ec5b","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"IndexLabel","sourcePath":"components/palette/IndexLabel.jsx"},{"name":"PaletteStrip","sourcePath":"components/palette/PaletteStrip.jsx"},{"name":"Swatch","sourcePath":"components/palette/Swatch.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Dialog","sourcePath":"components/surfaces/Dialog.jsx"},{"name":"Tabs","sourcePath":"components/surfaces/Tabs.jsx"},{"name":"Toast","sourcePath":"components/surfaces/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/surfaces/Tooltip.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"c543dbe3dad8","components/core/Button.jsx":"f96d7011c32a","components/core/Icon.jsx":"6f6035e5a96f","components/core/IconButton.jsx":"6ae04bdd8230","components/core/Tag.jsx":"24c38497d44c","components/forms/Checkbox.jsx":"22751056a024","components/forms/Input.jsx":"808de52f2424","components/forms/Radio.jsx":"0fcabbdadb4e","components/forms/Select.jsx":"242dc8f05c98","components/forms/Switch.jsx":"f66820a73639","components/palette/IndexLabel.jsx":"ba590079147a","components/palette/PaletteStrip.jsx":"8d646d2abb53","components/palette/Swatch.jsx":"785b83b8c8be","components/surfaces/Card.jsx":"6ec051a80864","components/surfaces/Dialog.jsx":"c608d24533a4","components/surfaces/Tabs.jsx":"fcbedba617ce","components/surfaces/Toast.jsx":"ea3555201f9f","components/surfaces/Tooltip.jsx":"770b6f550ceb","ui_kits/website/Header.jsx":"1ef1b7b286af","ui_kits/website/Hero.jsx":"7a82b801985e","ui_kits/website/PaletteDetail.jsx":"c5791bad2970","ui_kits/website/PaletteGrid.jsx":"d829e2ddf8ca","ui_kits/website/Saved.jsx":"d61c267b39da","ui_kits/website/data.js":"f14a28924db9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_b8ec5b = window.DesignSystem_b8ec5b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const tones = {
  neutral: ["var(--paper-2)", "var(--ink-2)"],
  bamboo: ["var(--bamboo-100)", "var(--bamboo-900)"],
  leaf: ["var(--leaf-100)", "var(--leaf-700)"],
  sea: ["var(--sea-100)", "var(--sea-700)"],
  blush: ["var(--blush-100)", "#7A635D"],
  ink: ["var(--ink-1)", "var(--paper-0)"]
};
function Badge({
  tone = "neutral",
  children,
  dot
}) {
  const [bg, fg] = tones[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 10px",
      background: bg,
      color: fg,
      borderRadius: "var(--radius-pill)",
      font: "400 10.5px/1.2 var(--font-mono)",
      letterSpacing: ".14em",
      textTransform: "uppercase"
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: fg
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = "primary",
  size = "md",
  disabled,
  icon,
  iconRight,
  full,
  children,
  onClick,
  style
}) {
  const [h, setH] = React.useState(false),
    [p, setP] = React.useState(false);
  const pad = {
    sm: "7px 14px",
    md: "11px 22px",
    lg: "15px 30px"
  }[size];
  const fs = {
    sm: "12px",
    md: "14px",
    lg: "15px"
  }[size];
  const v = {
    primary: {
      bg: h ? "var(--bamboo-900)" : "var(--bamboo-700)",
      fg: "var(--paper-0)",
      bd: "transparent"
    },
    ink: {
      bg: h ? "#000" : "var(--ink-1)",
      fg: "var(--paper-0)",
      bd: "transparent"
    },
    secondary: {
      bg: h ? "var(--paper-2)" : "transparent",
      fg: "var(--ink-1)",
      bd: "var(--ink-1)"
    },
    ghost: {
      bg: h ? "var(--paper-2)" : "transparent",
      fg: "var(--ink-1)",
      bd: "transparent"
    },
    warm: {
      bg: h ? "var(--leaf-700)" : "var(--leaf-500)",
      fg: "var(--paper-0)",
      bd: "transparent"
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    style: {
      display: full ? "flex" : "inline-flex",
      width: full ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: pad,
      font: `400 ${fs}/1 var(--font-serif)`,
      letterSpacing: ".12em",
      background: disabled ? "var(--paper-2)" : v.bg,
      color: disabled ? "var(--ink-4)" : v.fg,
      border: `1px solid ${disabled ? "transparent" : v.bd}`,
      borderRadius: "var(--radius-pill)",
      cursor: disabled ? "not-allowed" : "pointer",
      transform: p && !disabled ? "scale(.98)" : "none",
      transition: "background var(--dur-calm) var(--ease-breeze),transform var(--dur-quick) var(--ease-breeze)",
      ...style
    }
  }, icon, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
const toPascal = s => s.replace(/(^|-)(\w)/g, (_, a, b) => b.toUpperCase());
function Icon({
  name,
  size = 18,
  strokeWidth = 1.25,
  color = "currentColor",
  style
}) {
  const lib = typeof window !== "undefined" && window.lucide && window.lucide.icons;
  let node = lib && (lib[toPascal(name)] || lib[name]);
  if (node && node[0] === "svg") node = node[2];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: "none",
      display: "block",
      ...style
    },
    "aria-hidden": "true"
  }, (node || []).map(([t, a], i) => React.createElement(t, {
    key: i,
    ...a
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  children,
  variant = "ghost",
  size = 40,
  label,
  active,
  onClick,
  disabled
}) {
  const [h, setH] = React.useState(false);
  const bg = variant === "solid" ? h ? "var(--bamboo-900)" : "var(--bamboo-700)" : variant === "outline" ? h ? "var(--paper-2)" : "transparent" : h || active ? "var(--paper-2)" : "transparent";
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: size,
      height: size,
      display: "inline-grid",
      placeItems: "center",
      borderRadius: "50%",
      border: variant === "outline" ? "1px solid var(--ink-1)" : "1px solid transparent",
      background: bg,
      color: variant === "solid" ? "var(--paper-0)" : active ? "var(--bamboo-700)" : "var(--ink-1)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .4 : 1,
      transition: "background var(--dur-calm) var(--ease-breeze)"
    }
  }, children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  selected,
  onClick,
  onRemove,
  color
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 14px",
      border: "1px solid " + (selected ? "var(--ink-1)" : "var(--line-hair)"),
      background: selected ? "var(--ink-1)" : h ? "var(--paper-2)" : "transparent",
      color: selected ? "var(--paper-0)" : "var(--ink-1)",
      borderRadius: "var(--radius-pill)",
      font: "300 13px/1.2 var(--font-serif)",
      letterSpacing: ".08em",
      cursor: onClick ? "pointer" : "default",
      transition: "background var(--dur-calm) var(--ease-breeze)"
    }
  }, color && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: color,
      boxShadow: "inset 0 0 0 1px rgba(0,0,0,.08)"
    }
  }), children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      cursor: "pointer",
      opacity: .6,
      fontFamily: "var(--font-mono)"
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      font: "300 15px/1.4 var(--font-serif)",
      letterSpacing: ".04em"
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 16,
      height: 16,
      border: "1px solid var(--ink-1)",
      borderRadius: "var(--radius-1)",
      background: checked ? "var(--bamboo-700)" : "transparent",
      borderColor: checked ? "var(--bamboo-700)" : "var(--ink-1)",
      display: "grid",
      placeItems: "center",
      transition: "background var(--dur-quick) var(--ease-breeze)"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 4,
      borderLeft: "1.5px solid var(--paper-0)",
      borderBottom: "1.5px solid var(--paper-0)",
      transform: "rotate(-45deg) translate(1px,-1px)"
    }
  })), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
const FL = ({
  label,
  hint,
  children
}) => /*#__PURE__*/React.createElement("label", {
  style: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  }
}, label && /*#__PURE__*/React.createElement("span", {
  style: {
    font: "400 11px/1.2 var(--font-mono)",
    letterSpacing: ".16em",
    textTransform: "uppercase",
    color: "var(--ink-2)"
  }
}, label), children, hint && /*#__PURE__*/React.createElement("span", {
  style: {
    font: "300 12px/1.4 var(--font-serif)",
    color: "var(--ink-3)"
  }
}, hint));
function Input({
  label,
  hint,
  error,
  placeholder,
  value,
  onChange,
  type = "text",
  icon,
  disabled
}) {
  const [f, setF] = React.useState(false);
  const line = error ? "var(--danger)" : f ? "var(--bamboo-700)" : "var(--ink-4)";
  return /*#__PURE__*/React.createElement(FL, {
    label: label,
    hint: error || hint
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      borderBottom: `1px solid ${line}`,
      padding: "8px 0",
      transition: "border-color var(--dur-calm) var(--ease-breeze)",
      opacity: disabled ? .5 : 1
    }
  }, icon, /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 0,
      background: "transparent",
      font: "300 16px/1.4 var(--font-serif)",
      color: "var(--ink-1)",
      letterSpacing: ".04em"
    }
  })));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  disabled,
  name
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      font: "300 15px/1.4 var(--font-serif)",
      letterSpacing: ".04em"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    checked: !!checked,
    disabled: disabled,
    onChange: () => onChange && onChange(true),
    style: {
      display: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      border: "1px solid " + (checked ? "var(--bamboo-700)" : "var(--ink-1)"),
      display: "grid",
      placeItems: "center"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--bamboo-700)"
    }
  })), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const FL = ({
  label,
  hint,
  children
}) => /*#__PURE__*/React.createElement("label", {
  style: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  }
}, label && /*#__PURE__*/React.createElement("span", {
  style: {
    font: "400 11px/1.2 var(--font-mono)",
    letterSpacing: ".16em",
    textTransform: "uppercase",
    color: "var(--ink-2)"
  }
}, label), children, hint && /*#__PURE__*/React.createElement("span", {
  style: {
    font: "300 12px/1.4 var(--font-serif)",
    color: "var(--ink-3)"
  }
}, hint));
function Select({
  label,
  hint,
  options = [],
  value,
  onChange,
  disabled
}) {
  return /*#__PURE__*/React.createElement(FL, {
    label: label,
    hint: hint
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "flex",
      borderBottom: "1px solid var(--ink-4)",
      opacity: disabled ? .5 : 1
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    disabled: disabled,
    style: {
      appearance: "none",
      flex: 1,
      border: 0,
      outline: 0,
      background: "transparent",
      padding: "8px 24px 8px 0",
      font: "300 16px/1.4 var(--font-serif)",
      color: "var(--ink-1)",
      letterSpacing: ".04em",
      cursor: "pointer"
    }
  }, options.map(o => typeof o === "string" ? /*#__PURE__*/React.createElement("option", {
    key: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 2,
      top: "50%",
      transform: "translateY(-50%)",
      font: "400 11px var(--font-mono)",
      pointerEvents: "none"
    }
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  label,
  disabled
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      font: "300 15px/1.4 var(--font-serif)",
      letterSpacing: ".04em"
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 40,
      height: 22,
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--bamboo-700)" : "var(--paper-3)",
      position: "relative",
      transition: "background var(--dur-calm) var(--ease-breeze)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: checked ? 21 : 3,
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "var(--paper-0)",
      boxShadow: "0 1px 3px rgba(42,41,38,.2)",
      transition: "left var(--dur-calm) var(--ease-breeze)"
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/palette/IndexLabel.jsx
try { (() => {
function IndexLabel({
  no,
  children,
  rule = 96,
  color = "var(--ink-1)"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      font: "400 11px/1.2 var(--font-mono)",
      letterSpacing: ".18em",
      textTransform: "uppercase",
      color
    }
  }, no != null && /*#__PURE__*/React.createElement("span", null, "No.", no), /*#__PURE__*/React.createElement("span", {
    style: {
      width: rule,
      height: 1,
      background: color,
      flex: "none"
    }
  }), children && /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { IndexLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/palette/IndexLabel.jsx", error: String((e && e.message) || e) }); }

// components/palette/PaletteStrip.jsx
try { (() => {
function PaletteStrip({
  colors = [],
  height = 120,
  showCodes = true,
  onPick,
  radius = "var(--radius-1)",
  grain = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height,
      borderRadius: radius,
      overflow: "hidden"
    }
  }, colors.map((c, i) => {
    const hex = typeof c === "string" ? c : c.hex,
      n = typeof c === "string" ? null : c.name;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => onPick && onPick(hex),
      style: {
        flex: 1,
        background: grain ? `var(--texture-grain), ${hex}` : hex,
        backgroundBlendMode: grain ? "multiply" : undefined,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 10,
        cursor: onPick ? "pointer" : "default",
        transition: "flex var(--dur-slow) var(--ease-drift)"
      },
      onMouseEnter: e => onPick && (e.currentTarget.style.flex = "1.6"),
      onMouseLeave: e => e.currentTarget.style.flex = "1"
    }, showCodes && /*#__PURE__*/React.createElement("span", {
      style: {
        font: "400 10px/1.3 var(--font-mono)",
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: "rgba(42,41,38,.72)",
        mixBlendMode: "multiply"
      }
    }, n && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        font: "300 12px var(--font-serif)",
        letterSpacing: ".06em"
      }
    }, n), hex));
  }));
}
Object.assign(__ds_scope, { PaletteStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/palette/PaletteStrip.jsx", error: String((e && e.message) || e) }); }

// components/palette/Swatch.jsx
try { (() => {
function Swatch({
  color,
  name,
  code,
  size = "md",
  shape = "rect",
  grain = true,
  onClick
}) {
  const [h, setH] = React.useState(false);
  const d = {
    sm: 48,
    md: 96,
    lg: 160
  }[size];
  const r = {
    rect: "var(--radius-1)",
    circle: "50%",
    arch: "var(--radius-arch)"
  }[shape];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      cursor: onClick ? "pointer" : "default",
      width: d
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: d,
      height: shape === "arch" ? d * 1.4 : d,
      background: grain ? `var(--texture-grain), ${color}` : color,
      backgroundBlendMode: grain ? "multiply" : undefined,
      borderRadius: r,
      boxShadow: "inset 0 0 0 1px rgba(42,41,38,.08)",
      transform: h && onClick ? "translateY(-3px)" : "none",
      transition: "transform var(--dur-calm) var(--ease-breeze)"
    }
  }), name && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "300 14px/1.3 var(--font-serif)",
      letterSpacing: ".08em"
    }
  }, name), code && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 10.5px/1.2 var(--font-mono)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "var(--ink-3)"
    }
  }, code));
}
Object.assign(__ds_scope, { Swatch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/palette/Swatch.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function Card({
  children,
  media,
  mediaHeight = 180,
  eyebrow,
  title,
  footer,
  variant = "paper",
  onClick,
  padding = 24
}) {
  const [h, setH] = React.useState(false);
  const bg = {
    paper: "var(--surface-card)",
    sunken: "var(--surface-sunken)",
    outline: "transparent"
  }[variant];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: bg,
      border: variant === "outline" ? "1px solid var(--ink-1)" : "1px solid var(--line-hair)",
      borderRadius: "var(--radius-1)",
      overflow: "hidden",
      cursor: onClick ? "pointer" : "default",
      boxShadow: onClick && h ? "var(--shadow-soft)" : "none",
      transform: onClick && h ? "translateY(-2px)" : "none",
      transition: "all var(--dur-calm) var(--ease-breeze)",
      display: "flex",
      flexDirection: "column"
    }
  }, media && /*#__PURE__*/React.createElement("div", {
    style: {
      height: mediaHeight,
      position: "relative"
    }
  }, media), /*#__PURE__*/React.createElement("div", {
    style: {
      padding,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 10.5px/1.2 var(--font-mono)",
      letterSpacing: ".18em",
      textTransform: "uppercase",
      color: "var(--ink-3)"
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "300 22px/1.3 var(--font-serif)",
      letterSpacing: ".06em"
    }
  }, title), children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `14px ${padding}px`,
      borderTop: "1px solid var(--line-hair)",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Dialog.jsx
try { (() => {
function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  width = 480
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "var(--scrim)",
      backdropFilter: "blur(6px)",
      display: "grid",
      placeItems: "center",
      zIndex: 50,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hh-grain",
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-2)",
      boxShadow: "var(--shadow-float)",
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "300 24px/1.3 var(--font-serif)",
      letterSpacing: ".08em"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 0,
      background: "transparent",
      cursor: "pointer",
      font: "300 22px/1 var(--font-mono)",
      color: "var(--ink-2)"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      color: "var(--ink-2)"
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 6
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: 28,
      borderBottom: "1px solid var(--line-hair)"
    }
  }, items.map(it => {
    const k = typeof it === "string" ? it : it.value,
      l = typeof it === "string" ? it : it.label,
      a = k === value;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      role: "tab",
      "aria-selected": a,
      onClick: () => onChange && onChange(k),
      style: {
        border: 0,
        background: "transparent",
        padding: "10px 0",
        marginBottom: -1,
        cursor: "pointer",
        borderBottom: "1.5px solid " + (a ? "var(--ink-1)" : "transparent"),
        color: a ? "var(--ink-1)" : "var(--ink-3)",
        font: "300 15px/1.2 var(--font-serif)",
        letterSpacing: ".12em",
        transition: "color var(--dur-calm) var(--ease-breeze)"
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Toast.jsx
try { (() => {
function Toast({
  children,
  tone = "ink",
  swatch,
  action,
  onAction
}) {
  const bg = tone === "paper" ? "var(--surface-card)" : "var(--ink-1)",
    fg = tone === "paper" ? "var(--ink-1)" : "var(--paper-0)";
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 18px",
      background: bg,
      color: fg,
      borderRadius: "var(--radius-pill)",
      boxShadow: "var(--shadow-float)",
      border: tone === "paper" ? "1px solid var(--line-hair)" : "0",
      font: "300 14px/1.3 var(--font-serif)",
      letterSpacing: ".06em"
    }
  }, swatch && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: swatch,
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,.2)"
    }
  }), /*#__PURE__*/React.createElement("span", null, children), action && /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      border: 0,
      background: "transparent",
      color: "inherit",
      cursor: "pointer",
      font: "400 10.5px/1 var(--font-mono)",
      letterSpacing: ".16em",
      textTransform: "uppercase",
      textDecoration: "underline",
      textUnderlineOffset: 3
    }
  }, action));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Toast.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Tooltip.jsx
try { (() => {
function Tooltip({
  content,
  children,
  placement = "top"
}) {
  const [o, setO] = React.useState(false);
  const pos = placement === "top" ? {
    bottom: "calc(100% + 8px)"
  } : {
    top: "calc(100% + 8px)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setO(true),
    onMouseLeave: () => setO(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "50%",
      ...pos,
      transform: `translateX(-50%) translateY(${o ? 0 : 4}px)`,
      opacity: o ? 1 : 0,
      pointerEvents: "none",
      whiteSpace: "nowrap",
      background: "var(--ink-1)",
      color: "var(--paper-0)",
      padding: "6px 10px",
      borderRadius: "var(--radius-1)",
      font: "400 10.5px/1.2 var(--font-mono)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      transition: "all var(--dur-quick) var(--ease-breeze)",
      zIndex: 10
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
function HHHeader({
  page,
  go,
  savedCount
}) {
  const {
    IconButton,
    Icon
  } = window.DesignSystem_b8ec5b;
  const link = (k, l) => /*#__PURE__*/React.createElement("a", {
    onClick: () => go(k),
    style: {
      cursor: 'pointer',
      textDecoration: 'none',
      color: page === k ? 'var(--ink-1)' : 'var(--ink-3)',
      font: '300 14px/1 var(--font-serif)',
      letterSpacing: '.14em',
      borderBottom: page === k ? '1px solid var(--ink-1)' : '1px solid transparent',
      paddingBottom: 4
    }
  }, l);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '28px 56px',
      borderBottom: '1px solid var(--line-hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => go('home'),
    style: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'baseline',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '300 22px/1 var(--font-serif)',
      letterSpacing: '.2em'
    }
  }, "\u82B1\u65E5\u548C\u914D\u8272"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: '.28em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, "Hanabiyori")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 36
    }
  }, link('home', '今日'), link('palettes', '配色'), link('saved', '收藏' + (savedCount ? ' · ' + savedCount : ''))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "\u641C\u5C0B"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "\u6536\u85CF",
    onClick: () => go('saved')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bookmark"
  }))));
}
window.HHHeader = HHHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
function HHHero({
  palette,
  open
}) {
  const {
    Button,
    IndexLabel,
    Icon,
    PaletteStrip
  } = window.DesignSystem_b8ec5b;
  const blocks = [[6, 10, 30, 38, 'var(--bamboo-500)', .75, 8], [30, 34, 30, 34, 'var(--bamboo-300)', .6, 10], [58, 6, 24, 30, 'var(--bamboo-100)', .9, 6], [62, 52, 30, 30, 'var(--bamboo-500)', .55, 12], [12, 62, 22, 30, 'var(--bamboo-300)', .5, 10]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.05fr)',
      gap: 56,
      padding: '72px 56px 88px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(IndexLabel, {
    no: palette.no
  }, "Today \xB7 ", palette.en), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 96px/1 var(--font-display)',
      letterSpacing: '.02em'
    }
  }, "Slow Colors"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      fontSize: 48,
      letterSpacing: '.1em'
    }
  }, "\u4ECA\u5929\uFF0C", palette.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-body)',
      fontSize: 17,
      color: 'var(--ink-2)',
      maxWidth: 420
    }
  }, palette.note, "\u628A\u984F\u8272\u7576\u4F5C\u5929\u6C23\u4F86\u8B80\uFF0C\u4E0D\u6025\uFF0C\u6162\u6162\u914D\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => open(palette),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "\u770B\u9019\u7D44\u914D\u8272"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "\u6BCF\u65E5\u8A02\u95B1"))), /*#__PURE__*/React.createElement("div", {
    className: "hh-grain",
    style: {
      position: 'relative',
      aspectRatio: '4/5',
      background: 'var(--paper-0)',
      border: '1px solid var(--line-hair)',
      overflow: 'hidden'
    }
  }, blocks.map(([l, t, w, h, c, o, b], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      left: l + '%',
      top: t + '%',
      width: w + '%',
      height: h + '%',
      background: c,
      opacity: o,
      filter: 'blur(' + b + 'px)'
    }
  })), [22, 48, 74, 80, 86].map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: 'l' + i,
    style: {
      position: 'absolute',
      left: x + '%',
      top: i % 2 ? '8%' : 0,
      bottom: 0,
      width: 1.5,
      background: 'var(--bamboo-700)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 24
    }
  }, /*#__PURE__*/React.createElement(PaletteStrip, {
    colors: palette.colors,
    height: 56,
    showCodes: false
  }))));
}
window.HHHero = HHHero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PaletteDetail.jsx
try { (() => {
function HHPaletteDetail({
  p,
  back,
  saved,
  toggle,
  copy
}) {
  const {
    Button,
    IndexLabel,
    Icon,
    Swatch,
    PaletteStrip,
    Radio,
    Switch,
    Tooltip,
    IconButton
  } = window.DesignSystem_b8ec5b;
  const [fmt, setFmt] = React.useState('hex');
  const [grain, setGrain] = React.useState(true);
  const conv = h => {
    const n = parseInt(h.slice(1), 16),
      r = n >> 16,
      g = n >> 8 & 255,
      b = n & 255;
    return fmt === 'hex' ? h : 'rgb(' + r + ', ' + g + ', ' + b + ')';
  };
  const on = saved.includes(p.id);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '48px 56px 96px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: back,
    style: {
      cursor: 'pointer',
      display: 'inline-flex',
      gap: 8,
      alignItems: 'center',
      textDecoration: 'none',
      color: 'var(--ink-2)',
      font: 'var(--type-label)',
      letterSpacing: '.16em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 14
  }), "All palettes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 320px',
      gap: 56,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: grain ? 'hh-grain' : '',
    style: {
      height: 300,
      background: p.grad,
      position: 'relative'
    }
  }), /*#__PURE__*/React.createElement(PaletteStrip, {
    colors: p.colors.map(c => ({
      hex: c.hex,
      name: c.name
    })),
    height: 120,
    onPick: copy
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, p.colors.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.hex,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Swatch, {
    color: c.hex,
    name: c.name,
    code: conv(c.hex),
    size: "md",
    shape: c === p.colors[2] ? 'arch' : 'rect',
    onClick: () => copy(c.hex)
  }))))), /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(IndexLabel, {
    no: p.no,
    rule: 64
  }, p.season, " \xB7 ", p.en), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      fontSize: 44,
      letterSpacing: '.1em'
    }
  }, p.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-body)',
      color: 'var(--ink-2)'
    }
  }, p.note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22
    }
  }, ['hex', 'rgb'].map(k => /*#__PURE__*/React.createElement(Radio, {
    key: k,
    name: "fmt",
    label: k.toUpperCase(),
    checked: fmt === k,
    onChange: () => setFmt(k)
  }))), /*#__PURE__*/React.createElement(Switch, {
    label: "\u986F\u793A\u7D0B\u7406",
    checked: grain,
    onChange: setGrain
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: on ? 'secondary' : 'primary',
    onClick: () => toggle(p),
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 16
    })
  }, on ? '已收藏' : '收藏配色'), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Copy all"
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "copy all",
    variant: "outline",
    onClick: () => copy(p.colors.map(c => c.hex).join(' '))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "copy"
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Download"
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "download",
    variant: "outline"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download"
  })))))));
}
window.HHPaletteDetail = HHPaletteDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PaletteDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PaletteGrid.jsx
try { (() => {
function HHPaletteGrid({
  palettes,
  open,
  saved,
  toggle,
  title = true
}) {
  const {
    Card,
    Tabs,
    IndexLabel,
    IconButton,
    Icon,
    PaletteStrip,
    Badge
  } = window.DesignSystem_b8ec5b;
  const [s, setS] = React.useState('全部');
  const list = palettes.filter(p => s === '全部' || p.season === s);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '72px 56px'
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(IndexLabel, {
    no: "02"
  }, "Our Palettes"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--type-h2)',
      letterSpacing: '.1em'
    }
  }, "\u5B63\u7BC0\u914D\u8272")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: ['全部', '春', '夏', '秋', '冬'],
    value: s,
    onChange: setS
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 28
    }
  }, list.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.id,
    onClick: () => open(p),
    padding: 22,
    mediaHeight: 220,
    media: /*#__PURE__*/React.createElement("div", {
      className: "hh-grain",
      style: {
        height: '100%',
        background: p.grad
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 14,
        left: 14
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "ink"
    }, p.season, " ", p.en))),
    eyebrow: 'No.' + p.no,
    title: p.name,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(PaletteStrip, {
      colors: p.colors,
      height: 18,
      showCodes: false
    })), /*#__PURE__*/React.createElement("span", {
      onClick: e => {
        e.stopPropagation();
        toggle(p);
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "\u6536\u85CF",
      size: 34,
      active: saved.includes(p.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 16,
      color: saved.includes(p.id) ? 'var(--leaf-500)' : 'currentColor'
    }))))
  }))));
}
window.HHPaletteGrid = HHPaletteGrid;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PaletteGrid.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Saved.jsx
try { (() => {
function HHSaved({
  palettes,
  saved,
  open,
  toggle,
  go
}) {
  const {
    IndexLabel,
    Button
  } = window.DesignSystem_b8ec5b;
  const list = palettes.filter(p => saved.includes(p.id));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '72px 56px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(IndexLabel, {
    no: "03"
  }, "Collection"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--type-h2)',
      letterSpacing: '.1em'
    }
  }, "\u6211\u7684\u6536\u85CF")), list.length ? /*#__PURE__*/React.createElement(HHPaletteGrid, {
    palettes: list,
    open: open,
    saved: saved,
    toggle: toggle,
    title: false
  }) : /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '96px 56px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-body)',
      fontSize: 18,
      color: 'var(--ink-2)'
    }
  }, "\u9084\u6C92\u6709\u6536\u85CF\u3002\u53BB\u770B\u770B\u4ECA\u5929\u7684\u984F\u8272\u5427\u3002"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go('palettes')
  }, "\u700F\u89BD\u914D\u8272")));
}
window.HHSaved = HHSaved;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Saved.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
window.HH_PALETTES = [{
  id: 'p1',
  no: '01',
  season: '春',
  en: 'Spring',
  name: '竹青晨霧',
  note: '清晨竹林裡的薄霧，綠得很輕。',
  colors: [{
    hex: '#EFECE7',
    name: '米紙'
  }, {
    hex: '#DFE2DA',
    name: '霧'
  }, {
    hex: '#B4BDAD',
    name: '嫩竹'
  }, {
    hex: '#86957F',
    name: '竹'
  }, {
    hex: '#5D6E58',
    name: '竹青'
  }],
  grad: 'var(--grad-mist)'
}, {
  id: 'p2',
  no: '02',
  season: '夏',
  en: 'Summer',
  name: '櫻與海',
  note: '粉色的天空慢慢落進海裡。',
  colors: [{
    hex: '#ECE5E2',
    name: '櫻霧'
  }, {
    hex: '#D7C9C4',
    name: '櫻'
  }, {
    hex: '#CDCFCC',
    name: '晨'
  }, {
    hex: '#A9BEC3',
    name: '淺海'
  }, {
    hex: '#7395A0',
    name: '海'
  }],
  grad: 'var(--grad-dawn)'
}, {
  id: 'p3',
  no: '03',
  season: '秋',
  en: 'Autumn',
  name: '一片楓葉',
  note: '米白紙上落了一片橘紅的葉子。',
  colors: [{
    hex: '#F7F5F1',
    name: '紙'
  }, {
    hex: '#EBE1D8',
    name: '杏'
  }, {
    hex: '#CFB6A3',
    name: '柿'
  }, {
    hex: '#B08C72',
    name: '楓'
  }, {
    hex: '#5D6E58',
    name: '枝'
  }],
  grad: 'linear-gradient(160deg,#EBE1D8,#CFB6A3 55%,#93705C)'
}, {
  id: 'p4',
  no: '04',
  season: '冬',
  en: 'Winter',
  name: '暮色玫瑰',
  note: '傍晚的灰紫，帶一點海的冷。',
  colors: [{
    hex: '#BBB1B2',
    name: '灰粉'
  }, {
    hex: '#B5999A',
    name: '玫瑰'
  }, {
    hex: '#958A8C',
    name: '暮'
  }, {
    hex: '#8C9C9C',
    name: '霧海'
  }, {
    hex: '#6D788C',
    name: '夜'
  }],
  grad: 'var(--grad-rose)'
}, {
  id: 'p5',
  no: '05',
  season: '冬',
  en: 'Winter',
  name: '丹寧與鏽',
  note: '舊牛仔布和生鏽的鐵門。',
  colors: [{
    hex: '#6D788C',
    name: '丹寧'
  }, {
    hex: '#949AA8',
    name: '灰藍'
  }, {
    hex: '#BBB1B2',
    name: '灰粉'
  }, {
    hex: '#B19282',
    name: '陶'
  }, {
    hex: '#956A5A',
    name: '鏽'
  }],
  grad: 'var(--grad-dusk)'
}, {
  id: 'p6',
  no: '06',
  season: '夏',
  en: 'Summer',
  name: '潮汐',
  note: '退潮時沙灘上的顏色。',
  colors: [{
    hex: '#ECE5E2',
    name: '沙'
  }, {
    hex: '#DCE3E5',
    name: '浪'
  }, {
    hex: '#A9BEC3',
    name: '潮'
  }, {
    hex: '#7395A0',
    name: '海'
  }, {
    hex: '#557984',
    name: '深海'
  }],
  grad: 'var(--grad-tide)'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.IndexLabel = __ds_scope.IndexLabel;

__ds_ns.PaletteStrip = __ds_scope.PaletteStrip;

__ds_ns.Swatch = __ds_scope.Swatch;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
