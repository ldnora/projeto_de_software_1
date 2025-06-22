import ReactMarkdown from "react-markdown";
import { Heading, Text, Image, List, ListItem } from "@chakra-ui/react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

export default function BlocoDeTexto({ texto }: { texto: string }) {
  return (
    <section
      style={{
        maxWidth: 700,
        margin: "2rem auto",
      }}
    >
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <Heading as="h1" size="2xl" my={6} {...props} />
          ),
          h2: ({ node, ...props }) => (
            <Heading as="h2" size="xl" my={5} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <Heading as="h3" size="lg" my={4} {...props} />
          ),
          p: ({ node, ...props }) => (
            <Text as="p" mb={4} fontSize="lg" lineHeight={1.75} {...props} />
          ),
          ul: ({ node, ...props }) => <List styleType="disc" pl={6} mb={4} {...props} />,
          ol: ({ node, ...props }) => <List as="ol" styleType="decimal" pl={6} mb={4} {...props} />,
          li: ({ node, ...props }) => (
            <ListItem {...props} />
          ),
          img: ({ node, ...props }) => (
            <Image
              src={
                typeof props.src === "string" && props.src.startsWith("http")
                  ? props.src
                  : baseUrl + (props.src ?? "")
              }
              alt={props.alt ?? ""}
              maxW="100%"
              borderRadius={8}
              my={4}
            />
          ),
        }}
      >
        {texto}
      </ReactMarkdown>
    </section>
  );
}