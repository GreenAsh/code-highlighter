interface TokenFactory {
    create(token: String, className: string): Node | false | null;
}