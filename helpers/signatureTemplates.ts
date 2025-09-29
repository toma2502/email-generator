import { SignatureData, Template } from '../types';

// A map of social network keys to their SVG path data.
// Using simple paths for better email client compatibility.
const socialIconPaths: { [key: string]: string } = {
  linkedIn: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM6 9H2V21h4V9zM4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011 3.584.07-4.85c.148-3.225 1.664 4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.058 1.281-.072 1.689-.072 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>',
  twitter: '<path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.34 0 11.35-6.08 11.35-11.35 0-.17 0-.34-.01-.51.78-.57 1.45-1.29 1.99-2.08z"/>',
  youtube: '<path d="M21.582 6.186A2.43 2.43 0 0 0 19.89 4.48C18.32 4 12 4 12 4s-6.32 0-7.89.48a2.43 2.43 0 0 0-1.692 1.706C2 7.752 2 12 2 12s0 4.248.418 5.814a2.43 2.43 0 0 0 1.692 1.706C5.68 20 12 20 12 20s6.32 0 7.89-.48a2.43 2.43 0 0 0 1.692-1.706C22 16.248 22 12 22 12s0-4.248-.418-5.814zM10 15.5v-7l6 3.5-6 3.5z"/>',
  tiktok: '<path d="M12.53.02C13.84 0 15.14.01 16.44 0a.08.08 0 0 1 .09.08v11.5a.08.08 0 0 1-.08.09c-.41.01-.82.02-1.23.02-.09 0-.17-.03-.23-.09a2.03 2.03 0 0 1-1.18-1.85v-5.26a.09.09 0 0 0-.09-.09c-.23.01-.46.01-.69.01a.08.08 0 0 1-.08-.08V.08a.08.08 0 0 1 .08-.06zM12.15 6.48c.03-1.31.02-2.61-.01-3.92A2.04 2.04 0 0 0 10.14 1.5c-1.31-.02-2.61.02-3.92.01a2.03 2.03 0 0 0-2.02 2.03c.03 1.31.02 2.62.01 3.92A2.04 2.04 0 0 0 6.22 9.5c1.31.02 2.61-.02 3.92-.01a2.03 2.03 0 0 0 2.02-2.02zM7.12 4.54a.09.09 0 0 1 .09-.09c.41-.01.82-.01 1.23-.02a.09.09 0 0 1 .09.09v1.94a.09.09 0 0 1-.09.09c-.41.01-.82.01-1.23.02a.09.09 0 0 1-.09-.09V4.54z"/>'
};

const contactIconPaths: { [key: string]: string } = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  email: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  website: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  address: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'
};

// --- HELPER FUNCTIONS FOR GENERATING HTML PARTS ---

const getFontStack = () => `Arial, Helvetica, sans-serif`;

const getTextStyle = (data: SignatureData, customColor?: string) => `font-size: ${data.fontSize}px; color: ${customColor || '#333333'}; font-family: ${getFontStack()}; line-height: ${data.lineHeight}%;`;

const getImageHtml = (data: SignatureData, type: 'logo' | 'avatar' = 'avatar') => {
    const { logo, avatar, imageSize, imageRoundness } = data;
    const imageSrc = type === 'logo' ? logo : avatar;
    if (!imageSrc) return '';
    
    // For vertical layouts, we might need different padding
    const paddingStyle = 'padding-right: 15px;';
    
    return `<td style="${paddingStyle} vertical-align: middle;">
        <img src="${imageSrc}" alt="${type}" width="${imageSize}" style="width: ${imageSize}px; max-width: ${imageSize}px; display: block; border-radius: ${imageRoundness}%;">
    </td>`;
};

const getSocialLinksHtml = (data: SignatureData, iconColor?: string) => {
    const { socials, showIcons, accentColor } = data;
    const finalIconColor = iconColor || accentColor;
    let socialLinksHtml = '';
    const activeSocials = Object.entries(socials).filter(([, url]) => url);
    if (showIcons && activeSocials.length > 0) {
        let links = '';
        activeSocials.forEach(([name, url], index) => {
            const pathData = socialIconPaths[name as keyof typeof socialIconPaths];
            if (pathData) {
                const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${finalIconColor}">${pathData}</svg>`;
                const encodedSvg = btoa(svgString);
                const marginRight = index < activeSocials.length - 1 ? 'margin-right: 8px;' : '';
                links += `<a href="${url}" target="_blank" title="${name}" style="display: inline-block; ${marginRight} text-decoration: none;">
                    <img src="data:image/svg+xml;base64,${encodedSvg}" alt="${name}" width="20" height="20" style="border:0; display: block; height:20px; width:20px;">
                </a>`;
            }
        });
        socialLinksHtml = `<div style="margin-top: 10px; line-height: 1;">${links}</div>`;
    }
    return socialLinksHtml;
};


const generateVerticalSocialLinksHtml = (data: SignatureData) => {
    const { socials, showIcons, accentColor } = data;
    if (!showIcons) return '';

    const activeSocials = Object.entries(socials).filter(([, url]) => url);
    if (activeSocials.length === 0) return '';

    let linksTable = '<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">';
    activeSocials.forEach(([name, url]) => {
        const pathData = socialIconPaths[name as keyof typeof socialIconPaths];
        if (pathData) {
            const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${accentColor}">${pathData}</svg>`;
            const encodedSvg = btoa(svgString);
            linksTable += `
                <tr>
                    <td style="padding-bottom: 8px;">
                        <a href="${url}" target="_blank" title="${name}" style="display: block; text-decoration: none;">
                            <img src="data:image/svg+xml;base64,${encodedSvg}" alt="${name}" width="20" height="20" style="border:0; display: block;">
                        </a>
                    </td>
                </tr>
            `;
        }
    });
    linksTable += '</table>';
    return linksTable;
};


// --- TEMPLATE-SPECIFIC GENERATORS ---

/**
 * Generates HTML for Modern and Corporate templates.
 */
const generateModernCorporateSignature = (data: SignatureData): string => {
    const {
        firstName, lastName, jobTitle, department, companyName,
        officePhone, mobilePhone, websiteUrl, email, address,
        primaryColor, secondaryColor, accentColor, fontSize, useAccentUnderline, showSeparators,
        direction, template
    } = data;

    const textStyle = getTextStyle(data);
    const imageHtml = getImageHtml(data);
    const socialLinksHtml = getSocialLinksHtml(data);

    let detailsHtml = '';
    if (firstName || lastName) detailsHtml += `<div style="${getTextStyle(data, '#000000')} font-weight: bold; font-size: ${fontSize + 2}px;">${firstName} ${lastName}</div>`;
    if (useAccentUnderline && template === 'modern') detailsHtml += `<div style="width: 40px; height: 2px; background-color: ${accentColor}; margin: 5px 0;"></div>`;
    if (jobTitle) detailsHtml += `<div style="${textStyle}">${jobTitle}</div>`;
    if (department) detailsHtml += `<div style="${textStyle}">${department}</div>`;
    if (companyName) detailsHtml += `<div style="${textStyle} font-weight: bold;">${companyName}</div>`;

    const renderRow = (content: string) => content ? `<tr>${content}</tr>` : '';
    const renderContactRow = (iconName: string, value: string, link: string) => {
        if (!value) return '';
        let iconTd = '';
        if (data.showIcons && contactIconPaths[iconName]) {
            const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${contactIconPaths[iconName]}</svg>`;
            const encodedSvg = btoa(svgString);
            iconTd = `<td width="25" style="padding-right: 10px; vertical-align: middle;">
              <img src="data:image/svg+xml;base64,${encodedSvg}" alt="${iconName}" width="16" height="16" style="display: block; border:0;">
            </td>`;
        }
        return `<td style="padding-bottom: 4px;">
            <table cellpadding="0" cellspacing="0" border="0"><tr>${iconTd}<td style="vertical-align: middle;">
                <a href="${link}" style="${textStyle} color: ${primaryColor}; text-decoration: none;">${value}</a>
            </td></tr></table>
        </td>`;
    };
    
    let contactInfoHtml = '<table cellpadding="0" cellspacing="0" border="0">';
    contactInfoHtml += renderRow(renderContactRow('phone', officePhone, `tel:${officePhone.replace(/\s/g, '')}`));
    contactInfoHtml += renderRow(renderContactRow('phone', mobilePhone, `tel:${mobilePhone.replace(/\s/g, '')}`));
    contactInfoHtml += renderRow(renderContactRow('email', email, `mailto:${email}`));
    contactInfoHtml += renderRow(renderContactRow('website', websiteUrl.replace(/https?:\/\//, ''), websiteUrl));
    contactInfoHtml += renderRow(renderContactRow('address', address, `https://maps.google.com/?q=${encodeURIComponent(address)}`));
    contactInfoHtml += '</table>';

    const separatorHtml = showSeparators
        ? `<td style="border-left: 1px solid ${secondaryColor}; padding-left: 15px; padding-right: 15px;"></td>`
        : `<td style="width: 15px;"></td>`;

    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${getFontStack()};" dir="${direction}">
        <tr>
            ${imageHtml}
            <td style="vertical-align: top;"><table cellpadding="0" cellspacing="0" border="0"><tr>
                <td style="vertical-align: top;">
                    ${detailsHtml}
                    ${socialLinksHtml}
                </td>
                ${separatorHtml}
                <td style="vertical-align: top;">${contactInfoHtml}</td>
            </tr></table></td>
        </tr>
    </table>`;
};

/**
 * Generates HTML for the Professional template.
 */
const generateProfessionalSignature = (data: SignatureData): string => {
    const { firstName, lastName, jobTitle, department, companyName, officePhone, mobilePhone, websiteUrl, email, address, primaryColor, secondaryColor, showSeparators, direction, fontSize } = data;

    const textStyle = getTextStyle(data);
    const imageHtml = getImageHtml(data);
    const socialLinksHtml = getSocialLinksHtml(data);
    const phone = officePhone || mobilePhone;

    let detailsHtml = '';
    if (firstName || lastName) detailsHtml += `<div style="${getTextStyle(data, '#000000')} font-weight: bold; font-size: ${fontSize + 2}px;">${firstName} ${lastName}</div>`;
    if (jobTitle) detailsHtml += `<div style="${textStyle}">${jobTitle}${companyName ? `, ${companyName}` : ''}</div>`;
    else if (companyName) detailsHtml += `<div style="${textStyle}">${companyName}</div>`;
    if (department) detailsHtml += `<div style="${textStyle}">${department}</div>`;
    
    const separator = `<span style="color: ${secondaryColor}; padding: 0 5px;">|</span>`;
    let contactInfoHtml = '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 5px; margin-bottom: 10px;">';
    const row1 = [ phone ? `<a href="tel:${phone.replace(/\s/g, '')}" style="${textStyle} color: ${primaryColor}; text-decoration: none;">${phone}</a>` : '', websiteUrl ? `<a href="${websiteUrl}" style="${textStyle} color: ${primaryColor}; text-decoration: none;">${websiteUrl.replace(/https?:\/\//, '')}</a>` : '' ].filter(Boolean).join(separator);
    const row2 = [ email ? `<a href="mailto:${email}" style="${textStyle} color: ${primaryColor}; text-decoration: none;">${email}</a>` : '', address ? `<a href="https://maps.google.com/?q=${encodeURIComponent(address)}" style="${textStyle} color: ${primaryColor}; text-decoration: none;">${address}</a>` : '' ].filter(Boolean).join(separator);
    if (row1) contactInfoHtml += `<tr><td style="${textStyle}">${row1}</td></tr>`;
    if (row2) contactInfoHtml += `<tr><td style="${textStyle} padding-top: 4px;">${row2}</td></tr>`;
    contactInfoHtml += '</table>';
    
    const separatorHtml = showSeparators ? `<td style="width: 15px; border-left: 1px solid ${secondaryColor}; padding-left: 15px;"></td>` : `<td style="width: 15px;"></td>`;

    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${getFontStack()};" dir="${direction}">
        <tr>${imageHtml}${imageHtml && (detailsHtml || contactInfoHtml) ? separatorHtml : ''}<td style="vertical-align: middle;">
                ${detailsHtml}${contactInfoHtml}${socialLinksHtml}
        </td></tr>
    </table>`;
};

/**
 * Generates HTML for the Creative template.
 */
const generateCreativeSignature = (data: SignatureData): string => {
    const { firstName, lastName, jobTitle, companyName, officePhone, websiteUrl, email, address, direction, fontSize, primaryColor, accentColor } = data;
    const textStyle = getTextStyle(data);
    const socialLinksHtml = getSocialLinksHtml(data);

    let detailsHtml = '';
    if (firstName || lastName) detailsHtml += `<div style="${getTextStyle(data, '#000000')} font-weight: bold; font-size: ${fontSize + 2}px;">${firstName} ${lastName}</div>`;
    if (jobTitle) detailsHtml += `<div style="${textStyle}">${jobTitle}${companyName ? `, ${companyName}` : ''}</div>`;
    const leftColumn = `<td style="vertical-align: top; padding-right: 15px;">${detailsHtml}${socialLinksHtml}</td>`;

    const imageHtml = getImageHtml(data);

    const renderLabeledRow = (label: string, value: string, link: string) => {
        if (!value) return '';
        return `<tr><td style="padding-right: 10px; padding-bottom: 4px; vertical-align: top;"><strong style="${textStyle} color: ${accentColor};">${label}</strong></td><td style="padding-bottom: 4px; vertical-align: top;"><a href="${link}" style="${textStyle} color: ${primaryColor}; text-decoration: none;">${value}</a></td></tr>`;
    };
    let contactHtml = '<table cellpadding="0" cellspacing="0" border="0">';
    contactHtml += renderLabeledRow('Phone', officePhone, `tel:${officePhone.replace(/\s/g, '')}`);
    contactHtml += renderLabeledRow('Website', websiteUrl.replace(/https?:\/\//, ''), websiteUrl);
    contactHtml += renderLabeledRow('Email', email, `mailto:${email}`);
    contactHtml += renderLabeledRow('Address', address, `https://maps.google.com/?q=${encodeURIComponent(address)}`);
    contactHtml += '</table>';
    const rightColumn = `<td style="vertical-align: top; padding-left: 15px;">${contactHtml}</td>`;

    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${getFontStack()};" dir="${direction}">
        <tr>${leftColumn}${imageHtml}${rightColumn}</tr>
    </table>`;
};

/**
 * Generates HTML for the Banner template.
 */
const generateBannerSignature = (data: SignatureData): string => {
    const { firstName, lastName, jobTitle, companyName, officePhone, websiteUrl, email, address, direction, fontSize, primaryColor, accentColor } = data;
    const textStyle = getTextStyle(data);
    const imageHtml = getImageHtml(data);
    
    let detailsHtml = '';
    if (firstName || lastName) detailsHtml += `<div style="${getTextStyle(data, '#000000')} font-weight: bold; font-size: ${fontSize + 2}px;">${firstName} ${lastName}</div>`;
    if (jobTitle) detailsHtml += `<div style="${textStyle}">${jobTitle}${companyName ? `, ${companyName}` : ''}</div>`;
    
    const renderContactRow = (iconName: string, value: string, link: string) => {
        if (!value) return '';
        let iconTd = '';
        if (data.showIcons && contactIconPaths[iconName]) {
            const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${contactIconPaths[iconName]}</svg>`;
            const encodedSvg = btoa(svgString);
            iconTd = `<td width="25" style="padding-right: 10px; vertical-align: middle;"><img src="data:image/svg+xml;base64,${encodedSvg}" alt="${iconName}" width="16" height="16" style="display: block; border:0;"></td>`;
        }
        return `<tr><td style="padding-bottom: 4px;"><table cellpadding="0" cellspacing="0" border="0"><tr>${iconTd}<td><a href="${link}" style="${textStyle} color: ${primaryColor}; text-decoration: none;">${value}</a></td></tr></table></td></tr>`;
    };
    let contactInfoHtml = '<table cellpadding="0" cellspacing="0" border="0" style="padding-top: 5px;">';
    contactInfoHtml += renderContactRow('phone', officePhone, `tel:${officePhone.replace(/\s/g, '')}`);
    contactInfoHtml += renderContactRow('website', websiteUrl.replace(/https?:\/\//, ''), websiteUrl);
    contactInfoHtml += renderContactRow('email', email, `mailto:${email}`);
    contactInfoHtml += renderContactRow('address', address, `https://maps.google.com/?q=${encodeURIComponent(address)}`);
    contactInfoHtml += '</table>';
    
    const topPart = `<tr>${imageHtml}<td style="vertical-align: top;">${detailsHtml}${contactInfoHtml}</td></tr>`;

    const socialLinksHtml = getSocialLinksHtml(data, '#FFFFFF');
    const bannerPart = `<tr><td colspan="2" style="padding-top: 10px;"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="background-color: ${primaryColor}; padding: 8px 15px; border-radius: 4px;" align="right">${socialLinksHtml.replace('margin-top: 10px;', 'margin: 0;')}</td></tr></table></td></tr>`;

    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${getFontStack()};" dir="${direction}">${topPart}${socialLinksHtml ? bannerPart : ''}</table>`;
};

/**
 * Generates HTML for the Classic template.
 * Inspired by Judith Cormack's signature.
 */
const generateClassicSignature = (data: SignatureData): string => {
    const { firstName, lastName, jobTitle, logo, mobilePhone, officePhone, address, primaryColor, secondaryColor, direction, fontSize } = data;
    const textStyle = getTextStyle(data);
    const socialLinksHtml = getSocialLinksHtml(data);

    // Avatar on the left (forced circular)
    const avatarHtml = data.avatar ? `<td style="padding-right: 15px; vertical-align: top;">
        <img src="${data.avatar}" alt="Avatar" width="90" style="width: 90px; max-width: 90px; border-radius: 50%;">
    </td>` : '';

    // Details, Logo, Contacts on the right
    let detailsHtml = `<div style="${getTextStyle(data, '#000000')} font-weight: bold; text-transform: uppercase; font-size: ${fontSize + 4}px;">${firstName} ${lastName}</div>`;
    if (jobTitle) detailsHtml += `<div style="${getTextStyle(data)} text-transform: uppercase;">${jobTitle}</div>`;

    const logoHtml = logo ? `<td style="text-align: right; vertical-align: middle; padding-left: 20px;"><img src="${logo}" alt="Company Logo" height="40" style="height: 40px; max-height: 40px;"></td>` : '<td></td>';

    const renderLabeledContact = (label: string, value: string) => value ? `<span style="font-weight:bold;">${label}:</span> <span style="color: ${primaryColor};">${value}</span>` : '';
    const contactSeparator = `<span style="color: ${secondaryColor}; padding: 0 8px;">|</span>`;
    const contacts = [
        renderLabeledContact('Mobile', mobilePhone),
        renderLabeledContact('Office', officePhone),
        renderLabeledContact('Address', address)
    ].filter(Boolean).join(contactSeparator);
    const contactHtml = contacts ? `<div style="${textStyle} padding-top: 10px; padding-bottom: 10px;">${contacts}</div>` : '';

    const separatorHtml = `<div style="border-bottom: 1px solid ${secondaryColor}; margin: 10px 0;"></div>`;

    const rightSideHtml = `<td style="vertical-align: top;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr><td><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td>${detailsHtml}</td>${logoHtml}</tr></table></td></tr>
            <tr><td>${separatorHtml}</td></tr>
            <tr><td>${contactHtml}</td></tr>
            <tr><td>${socialLinksHtml}</td></tr>
        </table>
    </td>`;

    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${getFontStack()};" dir="${direction}"><tr>${avatarHtml}${rightSideHtml}</tr></table>`;
};

/**
 * Generates HTML for the Vertical Social template.
 * Inspired by Brick Tamland's signature.
 */
const generateVerticalSocialSignature = (data: SignatureData): string => {
    const { firstName, lastName, jobTitle, companyName, mobilePhone, websiteUrl, address, primaryColor, secondaryColor, direction, fontSize } = data;
    const textStyle = getTextStyle(data);
    const socialLinksHtml = generateVerticalSocialLinksHtml(data);
    const imageHtml = getImageHtml(data, 'avatar');

    let detailsHtml = `<div style="${getTextStyle(data, '#000000')} font-weight: bold; font-size: ${fontSize + 2}px;">${firstName} ${lastName}</div>`;
    if (jobTitle) detailsHtml += `<div style="${textStyle}">${jobTitle}</div>`;
    if (companyName) detailsHtml += `<div style="${textStyle}">${companyName}</div>`;

    const contactLink = (href: string, text: string) => `<a href="${href}" style="${textStyle} color: ${primaryColor}; text-decoration: none;">${text}</a>`;
    let contactHtml = `<div style="margin-top: 10px;">`;
    if (mobilePhone) contactHtml += `<div style="${textStyle}">Mobile: ${contactLink(`tel:${mobilePhone.replace(/\s/g, '')}`, mobilePhone)}</div>`;
    if (websiteUrl) contactHtml += `<div style="${textStyle}">Web: ${contactLink(websiteUrl, websiteUrl.replace(/https?:\/\//, ''))}</div>`;
    if (address) contactHtml += `<div style="${textStyle}">Address: ${contactLink(`https://maps.google.com/?q=${encodeURIComponent(address)}`, address)}</div>`;
    contactHtml += `</div>`;

    const detailsAndContact = `<td style="vertical-align: middle; padding: 0 15px;">${detailsHtml}${contactHtml}</td>`;
    const separatorHtml = socialLinksHtml ? `<td style="border-left: 2px solid ${secondaryColor}; padding: 0 15px 0 0;"></td>` : '';
    const socialCell = socialLinksHtml ? `<td style="vertical-align: middle; padding-left: 15px;">${socialLinksHtml}</td>` : '';
    
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${getFontStack()};" dir="${direction}"><tr>${imageHtml}${detailsAndContact}${separatorHtml}${socialCell}</tr></table>`;
};

/**
 * Generates HTML for the Logo Focus template.
 * Inspired by Brad Gibson's signature.
 */
const generateLogoFocusSignature = (data: SignatureData): string => {
    const { firstName, lastName, jobTitle, officePhone, websiteUrl, address, primaryColor, secondaryColor, accentColor, direction, fontSize } = data;
    const textStyle = getTextStyle(data);
    const logoHtml = getImageHtml(data, 'logo');

    let detailsHtml = `<div style="${getTextStyle(data, '#000000')} font-weight: bold; font-size: ${fontSize + 2}px;">${firstName} ${lastName}</div>`;
    if (jobTitle) detailsHtml += `<div style="${textStyle} color: ${primaryColor};">${jobTitle}</div>`;

    const renderContactRow = (iconName: string, value: string, link: string) => {
        if (!value) return '';
        let iconTd = '';
        if (data.showIcons && contactIconPaths[iconName]) {
            const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${contactIconPaths[iconName]}</svg>`;
            const encodedSvg = btoa(svgString);
            iconTd = `<td width="30" style="padding-right: 10px; vertical-align: middle;"><img src="data:image/svg+xml;base64,${encodedSvg}" alt="${iconName}" width="18" height="18"></td>`;
        }
        return `<tr>${iconTd}<td style="vertical-align: middle;"><a href="${link}" style="${textStyle} color: ${primaryColor}; text-decoration: none;">${value}</a></td></tr>`;
    };

    let contactHtml = `<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;">`;
    contactHtml += renderContactRow('phone', officePhone, `tel:${officePhone.replace(/\s/g, '')}`);
    contactHtml += renderContactRow('website', websiteUrl.replace(/https?:\/\//, ''), websiteUrl);
    contactHtml += renderContactRow('address', address, `https://maps.google.com/?q=${encodeURIComponent(address)}`);
    contactHtml += `</table>`;

    const detailsCell = `<td style="vertical-align: middle;">${detailsHtml}${contactHtml}</td>`;
    const separatorHtml = logoHtml ? `<td style="border-left: 1px solid ${secondaryColor}; padding: 0 15px;"></td>` : '';
    
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${getFontStack()};" dir="${direction}"><tr>${logoHtml}${separatorHtml}${detailsCell}</tr></table>`;
};


// Main generator function that dispatches to the correct template builder
export const generateSignatureHtml = (data: SignatureData): string => {
    switch (data.template) {
        case 'professional':
            return generateProfessionalSignature(data);
        case 'creative':
            return generateCreativeSignature(data);
        case 'banner':
            return generateBannerSignature(data);
        case 'classic':
            return generateClassicSignature(data);
        case 'verticalSocial':
            return generateVerticalSocialSignature(data);
        case 'logoFocus':
            return generateLogoFocusSignature(data);
        case 'minimal':
        case 'modern':
        case 'corporate':
        default:
            return generateModernCorporateSignature(data);
    }
};