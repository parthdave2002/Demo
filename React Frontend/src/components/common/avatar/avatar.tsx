import React from 'react'

interface AvatarProps {
    name: string | null | undefined
    size?: number
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 48 }) => {

    // generate initials from name: 'David Peters' -> 'DP', 'Jamie' -> 'JM'
    const getInitials = (name: string) => {
        if (!name) return ''
        const parts = name.trim().split(/\s+/)
        if (parts.length === 1) {
            const w = parts[0]
            return (w.charAt(0) + (w.charAt(1) || w.charAt(0))).toUpperCase()
        }
        const first = parts[0].charAt(0)
        const last = parts[parts.length - 1].charAt(0)
        return (first + last).toUpperCase()
    }
    
    // deterministic color from string -> hex
    const stringToColor = (str: string) => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            // eslint-disable-next-line no-bitwise
            hash = str.charCodeAt(i) + ((hash << 5) - hash)
        }
        const h = Math.abs(hash) % 360 // hue
        // use HSL for pleasant pastel colors
        return `hsl(${h}deg 70% 45%)`
    }
    
    

    const initials = getInitials(name || '')
    const bg = stringToColor(name || initials)
    const fontSize = Math.round(size / 2.8)
    return (
        <div
            className="rounded-full flex items-center justify-center text-white font-semibold"
            style={{
                width: size,
                height: size,
                backgroundColor: bg,
                fontSize,
            }}
            aria-hidden
        >
            {initials}
        </div>
    )
}


export default Avatar