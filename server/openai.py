
# init model
model = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0,
)

# get prompts
with open("llm/prompts/system.txt", "r") as file:
    system_txt = file.read()
with open("llm/prompts/template.txt", "r") as file:
    template_txt = file.read()
with open("llm/prompts/schema.json", "r") as file:
    schema_json = file.read()
with open("llm/prompts/examples.json", "r") as file:
    examples_json = file.read()
with open("llm/prompts/test_image.txt", "r") as file:
    image_data = file.read()

prompt = PromptTemplate(
    input_variables=["schema_json", "examples_json"],
    template=template_txt,
)
prompt_txt = prompt.format(
    schema_json=schema_json,
    examples_json=examples_json,
)

# prepare messages
messages = [
    SystemMessage(content=system_txt),
    HumanMessage(
        content=[
            {
                "type": "text",
                "text": prompt_txt,
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": image_data,
                    "detail": "low",
                },
            },
        ]
    ),
]

# initialize parser
parser = StrOutputParser()

# prepare chain
chain = model | parser

res = chain.invoke(messages)

print(res)


# extract JSON from the model's response
try:
    # Find the JSON portion of the response
    json_match = re.search(r"\{.*\}", res, re.DOTALL)
    if json_match:
        json_output = json.loads(json_match.group())
        print(json_output)
    else:
        print("No JSON found in the response.")
except json.JSONDecodeError:
    print("Failed to parse JSON response.")
