import { BodySmall, LinkText, Row } from '@repo/ui';
import { RouterLink } from '@/components/RouterLink';

type Props = {
  route: string;
  text: string;
  linkText: string;
};

export const AuthLink = ({ route, text, linkText }: Props) => (
  <Row className="flex-wrap items-center text-g500">
    <BodySmall $bold className="mr-xs">
      {text}
    </BodySmall>
    <RouterLink className="py-sm" to={route}>
      <LinkText $bold $variant="bodySmall" className="text-p500">
        {linkText}
      </LinkText>
    </RouterLink>
  </Row>
);
