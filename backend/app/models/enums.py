"""Énumérations métier partagées (contrats alignés sur frontend/types/index.ts)."""

import enum


class UserRole(str, enum.Enum):
    CLIENT = "client"
    ADMIN = "admin"


class ProductStatus(str, enum.Enum):
    EN_STOCK = "EN_STOCK"
    SUR_COMMANDE = "SUR_COMMANDE"
    INDISPONIBLE = "INDISPONIBLE"


class DeliveryMode(str, enum.Enum):
    DOMICILE = "domicile"
    RETRAIT = "retrait"


class OrderStatus(str, enum.Enum):
    EN_ATTENTE_PAIEMENT = "en_attente_paiement"
    PAYEE = "payee"
    EN_PREPARATION = "en_preparation"
    EXPEDIEE = "expediee"
    PRETE = "prete"  # prête pour retrait
    LIVREE = "livree"
    RECUPEREE = "recuperee"
    ANNULEE = "annulee"


class PaymentMethod(str, enum.Enum):
    MTN = "mtn"
    MOOV = "moov"
    CARTE = "carte"


class PaymentStatus(str, enum.Enum):
    EN_ATTENTE = "en_attente"
    REUSSI = "reussi"
    ECHOUE = "echoue"


class RequestType(str, enum.Enum):
    CONTACT = "contact"
    DEVIS = "devis"


class RequestStatus(str, enum.Enum):
    NOUVEAU = "nouveau"
    EN_COURS = "en_cours"
    TRAITE = "traite"
