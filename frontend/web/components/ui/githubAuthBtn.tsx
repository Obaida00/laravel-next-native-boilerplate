import React from 'react'
import { Button } from './button';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GithubAuthBtn({onClick} : {onClick?: () => void}) {
    return (
        <Button onClick={onClick ?? (() => {})} variant={'default'} className='font-[family-name:var(--font-geist-sans)] cursor-pointer'><FontAwesomeIcon icon={faGithub} size={'2x'} />Continue with GitHub</Button>
    );
}
